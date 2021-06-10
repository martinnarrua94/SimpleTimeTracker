import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
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

    addProjects$ = createEffect(
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

    updateProjects$ = createEffect(
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
}