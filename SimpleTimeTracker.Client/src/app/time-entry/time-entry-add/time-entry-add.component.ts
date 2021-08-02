import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProjectTask } from 'src/app/project-task/interfaces/project-task';
import { IProject } from 'src/app/project/project';
import { State } from 'src/app/state/app.state';
import * as timeEntryActions from '../state/time-entry.actions'
import * as projectTaskActions from '../../project-task/state/project-task.actions';
import * as fromTimeEntry from '../state';
import * as fromProjectTask from '../../project-task/state';
import * as fromProject from '../../project/state';
import { ITimeEntry } from '../interfaces/time-entry';
import { ITimeEntryUpdate } from '../interfaces/time-entry-update';
import { ITimeEntryCreate } from '../interfaces/time-entry-create';

@Component({
  selector: 'app-time-entry-add',
  templateUrl: './time-entry-add.component.html',
  styleUrls: ['./time-entry-add.component.css']
})
export class TimeEntryAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<State>, public dialog: MatDialog) { }

  projects$: Observable<IProject[]>;
  projectTasks$: Observable<IProjectTask[]>;
  timeEntryForm: FormGroup;
  currentTimeEntry: ITimeEntry;

  // For timer.
  startTime: Date;
  stopTime: Date;
  timerActive: boolean = false;

  ngOnInit(): void {
    this.setInitialState();

    this.projectTasks$ = this.store.pipe(select(fromProjectTask.getProjectTasks));
    this.projects$ = this.store.pipe(select(fromProject.getProjects));

    this.store.pipe(select(fromTimeEntry.getCurrentTimeEntry))
      .subscribe((timeEntry: ITimeEntry) => this.currentTimeEntry = timeEntry);
    
    this.store.select(fromTimeEntry.getTimeEntryStartDate)
    .subscribe((date: Date) => {
      if (date) {
        this.timeEntryForm.get('projectTaskId').disable();
        this.timeEntryForm.get('projectId').disable();

        this.startTimer();
      }   
      });
  }

  setInitialState() {
    this.timeEntryForm = this.fb.group({
      projectId: [null, Validators.required],
      projectTaskId: [{ value: 0, disabled: true }]
    });
  }

  projectSelected($event) {
    this.store.dispatch(new projectTaskActions.SetProjectIdFilter($event.value));

    this.timeEntryForm.get('projectTaskId').enable();
  }

  startTimeEntry() {
    if (this.timeEntryForm.valid) {
      
      let newTimeEntry: ITimeEntryCreate = {
        projectId: null,
        projectTaskId: null,
        endDate: null,
        notes: ''
      }

      const timeEntry = { ...newTimeEntry, ...this.timeEntryForm.value };

      this.store.dispatch(new timeEntryActions.AddTimeEntry(timeEntry));
    }
  }

  completeTimeEntry() {
      if (this.currentTimeEntry) {
        let updatedTimeEntry: ITimeEntryUpdate = {
          id: this.currentTimeEntry.id,
          startDate: this.currentTimeEntry.startDate,
          endDate: this.currentTimeEntry.endDate,
          notes: this.currentTimeEntry.notes
        }

        this.store.dispatch(new timeEntryActions.UpdateTimeEntry(updatedTimeEntry));
        this.stopTimer();
        this.store.dispatch(new projectTaskActions.SetProjectIdFilter(0));
        this.timeEntryForm.get('projectId').enable();

        this.timeEntryForm.reset();

        // BUG: Project control is shown as invalid after the reset.

        this.timeEntryForm.patchValue({
          projectTaskId: 0
        });
      }
  }

  // Timer.
  get timeEntryDuration() {
    return this.startTime && this.stopTime
      ? +this.stopTime - +this.startTime
      : 0;
  }

  timer() {
    if (this.timerActive) {
      this.stopTime = new Date();
      setTimeout(() => {
        this.timer();
      }, 1000);
    }
  }

  startTimer() {
    this.startTime = new Date();
    this.stopTime = this.stopTime;
    this.timerActive = true;
    this.timer();
  }

  stopTimer() {
    this.stopTime = new Date();
    this.timerActive = false;
  }

}
