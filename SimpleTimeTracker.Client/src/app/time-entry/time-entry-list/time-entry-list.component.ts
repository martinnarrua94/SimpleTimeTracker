import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as timeEntryActions from '../state/time-entry.actions'
import * as projectTaskActions from '../../project-task/state/project-task.actions';
import * as fromTimeEntry from '../state';
import * as fromProjectTask from '../../project-task/state';
import * as fromProject from '../../project/state';
import { Observable, timer } from 'rxjs';
import { ITimeEntry } from '../interfaces/time-entry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProjectTask } from 'src/app/project-task/interfaces/project-task';
import { IProject } from 'src/app/project/project';
import { ITimeEntryFilter } from '../interfaces/time-entry-filter';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { ITimeEntryCreate } from '../interfaces/time-entry-create';
import { map } from 'rxjs/operators';

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
  timeEntryDate: Date;

  constructor(private fb: FormBuilder, private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setInitialState();

    this.timeEntries$ = this.store.pipe(select(fromTimeEntry.getTimeEntries));

    this.projectTasks$ = this.store.pipe(select(fromProjectTask.getProjectTasks));
    this.projects$ = this.store.pipe(select(fromProject.getProjects));

    this.store.select(fromTimeEntry.getTimeEntryStartDate)
      .subscribe((timeEntryStartDate: Date) => {
        if (timeEntryStartDate) {

          timer(1000, 1000)
            .pipe(
              map(() => {
                // Timezone offset in minutes.
                let offset = timeEntryStartDate.getTimezoneOffset();

                // Date from the difference between the current date and the time entry start date.
                let newDate = new Date(new Date().getTime() - timeEntryStartDate.getTime());
                             
                var datePlusOffset = new Date(newDate.getTime() + offset*60000);
                return datePlusOffset;
              })
            )
            .subscribe(t => this.timeEntryDate = t);
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
      projectTaskId: [0]
    })

    this.store.dispatch(new timeEntryActions.Load());
  }

  projectSelected($event) {
    this.store.dispatch(new projectTaskActions.SetProjectIdFilter($event.value));
  }

  timeEntrySelected(timeEntry: ITimeEntry) {
    this.store.dispatch(new timeEntryActions.SetCurrentTimeEntry(timeEntry));
  }

  isProjectSelected() {

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

}
