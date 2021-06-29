import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { SnackbarOpen } from "src/app/state/shared/snackbar/snackbar.actions";
import { IProjectTask } from "../interfaces/project-task";
import { IProjectTaskCreate } from "../interfaces/project-task-create";
import { IProjectTaskUpdate } from "../interfaces/project-task-update";
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

    addProjectTask$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.AddProjectTask),
            map((action: projectTaskActions.AddProjectTask) => action.payload),
            mergeMap((projectTask: IProjectTaskCreate) =>
                this.projectTaskService.createProjectTask(projectTask).pipe(
                    map((createdProjectTask: IProjectTask) => (new projectTaskActions.AddProjectTaskSuccess(createdProjectTask))),
                    catchError(error => of(new projectTaskActions.AddProjectTaskFail(error)))
            ))
        )
    );

    updateProjectTask$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.UpdateProjectTask),
            map((action: projectTaskActions.UpdateProjectTask) => action.payload),
            mergeMap((projectTask: IProjectTaskUpdate) =>
                this.projectTaskService.updateProjectTask(projectTask).pipe(
                    map((updatedProjectTask: IProjectTask) => (new projectTaskActions.UpdateProjectTaskSuccess(updatedProjectTask))),
                    catchError(error => of(new projectTaskActions.UpdateProjectTaskFail(error)))
            ))
        )
    );

    deleteProjectTask$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.DeleteProjectTask),
            map((action: projectTaskActions.DeleteProjectTask) => action.payload),
            mergeMap((projectTaskId: number) =>
                this.projectTaskService.deleteProjectTask(projectTaskId).pipe(
                    map(() => (new projectTaskActions.DeleteProjectTaskSuccess())),
                    catchError(error => of(new projectTaskActions.UpdateProjectTaskFail(error)))
            ))
        )
    );

    addProjectTaskSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.AddProjectTaskSuccess),
            map(() => new SnackbarOpen({
                message: 'Project Task created successfully',
                action: 'Success'
            })),
        )
    );

    updateProjectTaskSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.UpdateProjectTaskSuccess),
            map(() => new SnackbarOpen({
                message: 'Project Task updated successfully',
                action: 'Success'
            })),
        )
    );

    deleteProjectTaskSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(projectTaskActions.ProjectTaskActionTypes.DeleteProjectTaskSuccess),
            map(() => new SnackbarOpen({
                message: 'Project Task deleted successfully',
                action: 'Success'
            })),
        )
    );
}