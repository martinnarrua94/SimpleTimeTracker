import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SnackbarOpen } from 'src/app/state/shared/snackbar/snackbar.actions';
import { IProject } from '../project';
import { ProjectService } from '../project.service';
import * as projectActions from './project.actions';

@Injectable({providedIn: 'root'})
export class ProjectEffects {
    constructor(private actions$: Actions, private projectService: ProjectService) { }
    
    loadProjects$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.Load),
            mergeMap((action: projectActions.Load) =>
                this.projectService.getAll().pipe(
                    map((projects: IProject[]) => (new projectActions.LoadSuccess(projects))),
                    catchError(error => of(new projectActions.LoadFail(error)))
            ))
        )
    );

    addProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.AddProject),
            map((action: projectActions.AddProject) => action.payload),
            mergeMap((project: IProject) =>
                this.projectService.createProject(project).pipe(
                    map((createdProject: IProject) => (new projectActions.AddProjectSuccess(createdProject))),
                    catchError(error => of(new projectActions.AddProjectFail(error)))
            ))
        )
    );

    updateProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.UpdateProject),
            map((action: projectActions.UpdateProject) => action.payload),
            mergeMap((project: IProject) =>
                this.projectService.updateProject(project).pipe(
                    map((updatedProject: IProject) => (new projectActions.UpdateProjectSuccess(updatedProject))),
                    catchError(error => of(new projectActions.UpdateProjectFail(error)))
            ))
        )
    );

    deleteProject$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.DeleteProject),
            map((action: projectActions.DeleteProject) => action.payload),
            mergeMap((projectId: number) =>
                this.projectService.deleteProject(projectId).pipe(
                    map(() => (new projectActions.DeleteProjectSuccess())),
                    catchError(error => of(new projectActions.UpdateProjectFail(error)))
            ))
        )
    );

    addProjectSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.AddProjectSuccess),
            map(() => new SnackbarOpen({
                message: 'Project created successfully',
                action: 'Success'
            })),
        )
    );

    updateProjectSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.UpdateProjectSuccess),
            map(() => new SnackbarOpen({
                message: 'Project updated successfully',
                action: 'Success'
            })),
        )
    );

    deleteProjectSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectActions.ProjectActionTypes.DeleteProjectSuccess),
            map(() => new SnackbarOpen({
                message: 'Project deleted successfully',
                action: 'Success'
            })),
        )
    );
}