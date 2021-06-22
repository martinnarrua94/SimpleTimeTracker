import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { IProjectTask } from "../project-task";
import { ProjectTaskService } from "../project-task.service";
import * as projectTaskActions from '../state/project-task.actions';

@Injectable({ providedIn: 'root' })
export class ProjectTaskEffects {
    constructor(private actions$: Actions, private projectTaskService: ProjectTaskService) { }
    
    loadProjectTasks$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.Load),
            mergeMap((action: projectTaskActions.Load) =>
                this.projectTaskService.getAll().pipe(
                    map((projects: IProjectTask[]) => (new projectTaskActions.LoadSuccess(projects))),
                    catchError(error => of(new projectTaskActions.LoadFail(error)))
            ))
        )
    );
}