import { Action } from "@ngrx/store";
import { IProjectTask } from "../project-task";

export enum ProjectTaskActionTypes {
    Load = '[Project Task] Load',
    LoadSuccess = '[Project Tasl] Load Success',
    LoadFail = '[Project Task] Load Fail',
    SetCurrentProjectTask = '[Project Task] Set Current Project Task',
    ClearCurrentProjectTask = '[Project Task] Clear Current Project Task',
    InitializeCurrentProjectTask = '[Project Task] Initialize Current Project Task',
    AddProjectTask = '[Project Task] Add Project Task',
    AddProjectTaskSuccess = '[Project Task] Add Project Task Success',
    AddProjectTaskFail = '[Project Task] Add Project Task Fail',
    UpdateProjectTask = '[Project Task] Update Project Task',
    UpdateProjectTaskSuccess = '[Project Task] Update Project Task Success',
    UpdateProjectTaskFail = '[Project Task] Update Project Task Fail',
    DeleteProjectTask = '[Project Task] Delete Project Task',
    DeleteProjectTaskSuccess = '[Project Task] Delete Project Task Success',
    DeleteProjectTaskFail = '[Project Task] Delete Project Task Fail'
}

export class Load implements Action {
    readonly type = ProjectTaskActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProjectTaskActionTypes.LoadSuccess;

    constructor(public payload: IProjectTask[]) { }
}

export class LoadFail implements Action {
    readonly type = ProjectTaskActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export class SetCurrentProjectTask implements Action {
    readonly type = ProjectTaskActionTypes.SetCurrentProjectTask;

    constructor(public payload: IProjectTask) { }
}

export class ClearCurrentProjectTask implements Action {
    readonly type = ProjectTaskActionTypes.ClearCurrentProjectTask;
}

export class InitializeCurrentProjectTask implements Action {
    readonly type = ProjectTaskActionTypes.InitializeCurrentProjectTask;
}

export class AddProjectTask implements Action {
    readonly type = ProjectTaskActionTypes.AddProjectTask;

    constructor(public payload: IProjectTask) { }
}

export class AddProjectTaskSuccess implements Action {
    readonly type = ProjectTaskActionTypes.AddProjectTaskSuccess;

    constructor(public payload: IProjectTask) { }
}

export class AddProjectTaskFail implements Action {
    readonly type = ProjectTaskActionTypes.AddProjectTaskFail;

    constructor(public payload: string) { }
}

export class UpdateProjectTask implements Action {
    readonly type = ProjectTaskActionTypes.UpdateProjectTask;

    constructor(public payload: IProjectTask) { }
}

export class UpdateProjectTaskSuccess implements Action {
    readonly type = ProjectTaskActionTypes.UpdateProjectTaskSuccess;

    constructor(public payload: IProjectTask) { }
}

export class UpdateProjectTaskFail implements Action {
    readonly type = ProjectTaskActionTypes.UpdateProjectTaskFail;

    constructor(public payload: string) { }
}

export class DeleteProjectTask implements Action {
    readonly type = ProjectTaskActionTypes.DeleteProjectTask;

    constructor(public payload: number) { }
}

export class DeleteProjectTaskSuccess implements Action {
    readonly type = ProjectTaskActionTypes.DeleteProjectTaskSuccess;
}

export class DeleteProjectTaskFail implements Action {
    readonly type = ProjectTaskActionTypes.DeleteProjectTaskFail;

    constructor(public payload: string) { }
}

export type ProjectTaskActions = Load
    | LoadSuccess
    | LoadFail
    | SetCurrentProjectTask
    | ClearCurrentProjectTask
    | InitializeCurrentProjectTask
    | AddProjectTask
    | AddProjectTaskSuccess
    | AddProjectTaskFail
    | UpdateProjectTask
    | UpdateProjectTaskSuccess
    | UpdateProjectTaskFail
    | DeleteProjectTask
    | DeleteProjectTaskSuccess
    | DeleteProjectTaskFail;