import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../state/app.state';
import { IProject } from '../project';
import * as projectActions from '../state/project.actions';
import * as fromProject from '../state';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects$: Observable<IProject[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projects$ = this.store.pipe(select(fromProject.getProjects));

    this.errorMessage$ = this.store.pipe(select(fromProject.getError))

  }
  
  newProject(): void {
    this.store.dispatch(new projectActions.InitializeCurrentProject());
  }

  editProject(project: IProject): void {
    this.projectSelected(project, false);
  }

  viewProject(project: IProject): void {
    this.projectSelected(project, true);
  }

  projectSelected(project: IProject, readOnly: boolean) {
    this.store.dispatch(new projectActions.SetCurrentProject(project));
    this.store.dispatch(new projectActions.SetReadOnlyValue(readOnly));
  }

  deleteProject(project: IProject): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: "¿Está seguro que desea eliminar este proyecto?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new projectActions.SetCurrentProject(project));
        this.store.dispatch(new projectActions.DeleteProject(project.id));
      }
    });
  }

}
