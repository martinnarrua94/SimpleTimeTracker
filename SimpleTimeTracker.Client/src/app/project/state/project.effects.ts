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
            mergeMap((action: projectActions.Load) => this.projectService.getAll().pipe(
                map((projects: IProject[]) => (new projectActions.LoadSuccess(projects))),
                catchError(error => of(new projectActions.LoadFail(error)))
            ))
        )
    );
}