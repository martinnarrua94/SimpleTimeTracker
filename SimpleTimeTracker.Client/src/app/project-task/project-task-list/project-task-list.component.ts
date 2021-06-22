import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { IProjectTask } from '../project-task';
import * as projectTaskActions from '../state/project-task.actions';
import * as fromProjectTask from '../state';
import * as fromProject from '../../project/state';
import { IProject } from 'src/app/project/project';

@Component({
  selector: 'app-project-task-list',
  templateUrl: './project-task-list.component.html',
  styleUrls: ['./project-task-list.component.css']
})
export class ProjectTaskListComponent implements OnInit {

  projectTasks$: Observable<IProjectTask[]>;
  projects$: Observable<IProject[]>;

  constructor(private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new projectTaskActions.Load());

    this.projectTasks$ = this.store.pipe(select(fromProjectTask.getProjectTasks));
    this.projects$ = this.store.pipe(select(fromProject.getProjects));
  }

}
