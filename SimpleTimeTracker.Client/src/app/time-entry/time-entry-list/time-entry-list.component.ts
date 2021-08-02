import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as timeEntryActions from '../state/time-entry.actions'
import * as projectTaskActions from '../../project-task/state/project-task.actions';
import * as fromTimeEntry from '../state';
import * as fromProjectTask from '../../project-task/state';
import * as fromProject from '../../project/state';
import { Observable } from 'rxjs';
import { ITimeEntry } from '../interfaces/time-entry';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProjectTask } from 'src/app/project-task/interfaces/project-task';
import { IProject } from 'src/app/project/project';
import { ITimeEntryFilter } from '../interfaces/time-entry-filter';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';

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

  constructor(private fb: FormBuilder, private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setInitialState();

    this.timeEntries$ = this.store.pipe(select(fromTimeEntry.getTimeEntries));

    this.projectTasks$ = this.store.pipe(select(fromProjectTask.getProjectTasks));
    this.projects$ = this.store.pipe(select(fromProject.getProjects));    
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

    this.store.dispatch(new timeEntryActions.Load());
  }

  projectSelected($event) {
    this.store.dispatch(new projectTaskActions.SetProjectIdFilter($event.value));
  }

  timeEntrySelected(timeEntry: ITimeEntry) {
    this.store.dispatch(new timeEntryActions.SetCurrentTimeEntry(timeEntry));
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
