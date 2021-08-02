import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as timeEntryActions from '../state/time-entry.actions'
import * as projectTaskActions from '../../project-task/state/project-task.actions';
import * as fromTimeEntry from '../state';
import * as fromProjectTask from '../../project-task/state';
import * as fromProject from '../../project/state';
import { Observable, Subscription, timer } from 'rxjs';
import { ITimeEntry } from '../interfaces/time-entry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProjectTask } from 'src/app/project-task/interfaces/project-task';
import { IProject } from 'src/app/project/project';
import { ITimeEntryFilter } from '../interfaces/time-entry-filter';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { ITimeEntryCreate } from '../interfaces/time-entry-create';
import { ITimeEntryUpdate } from '../interfaces/time-entry-update';

@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.css']
})
export class TimeEntryListComponent implements OnInit {

  timeEntries$: Observable<ITimeEntry[]>;
  projectTasks$: Observable<IProjectTask[]>;
  projects$: Observable<IProject[]>;
  filterForm: FormGroup;
  timeEntryForm: FormGroup;
  currentTimeEntry: ITimeEntry;

  // For timer.
  startTime: Date;
  stopTime: Date;
  timerActive: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setInitialState();

    this.timeEntries$ = this.store.pipe(select(fromTimeEntry.getTimeEntries));

    this.projectTasks$ = this.store.pipe(select(fromProjectTask.getProjectTasks));
    this.projects$ = this.store.pipe(select(fromProject.getProjects));

    this.store.pipe(select(fromTimeEntry.getCurrentTimeEntry))
      .subscribe((timeEntry: ITimeEntry) => this.currentTimeEntry = timeEntry );

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
    this.filterForm = this.fb.group({
      project: [null],
      projectTask: [null],
      dateRange: this.fb.group({
        start: [null],
        end: [null]
      })
    });

    this.timeEntryForm = this.fb.group({
      projectId: [null, Validators.required],
      projectTaskId: [{ value: 0, disabled: true }]
    });

    this.store.dispatch(new timeEntryActions.Load());
  }

  projectSelected($event) {
    this.store.dispatch(new projectTaskActions.SetProjectIdFilter($event.value));

    this.timeEntryForm.get('projectTaskId').enable();
  }

  timeEntrySelected(timeEntry: ITimeEntry) {
    this.store.dispatch(new timeEntryActions.SetCurrentTimeEntry(timeEntry));
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

  filterTimeEntries() {
    const filter = { ...this.filterForm.value };

    let timeEntriesFilter: ITimeEntryFilter = {
      rangeStartDate: filter.dateRange.start,
      rangeEndDate: filter.dateRange.end,
      projectId: filter.project,
      projectTaskId: filter.projectTask
    }

    this.store.dispatch(new timeEntryActions.FilterTimeEntries(timeEntriesFilter));
  }

  editTimeEntry(timeEntry: ITimeEntry): void {
    this.timeEntrySelected(timeEntry);
  }

  deleteTimeEntry(timeEntry: ITimeEntry): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: "¿Está seguro que desea eliminar este registro de tiempo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.timeEntrySelected(timeEntry);
        this.store.dispatch(new timeEntryActions.DeleteTimeEntry(timeEntry.id));
      }
    })
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
