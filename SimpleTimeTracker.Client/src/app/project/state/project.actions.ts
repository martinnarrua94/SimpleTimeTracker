import { Action } from "@ngrx/store";
import { IProject } from "../project";

export enum ProjectActionTypes {
    Load = '[Project] Load',
    LoadSuccess = '[Project] Load Success',
    LoadFail = '[Project] Load Fail',
    SetCurrentProject = '[Project] Set Current Project',
    SetReadOnlyValue = '[Project] Set Read Only Value', 
    ClearCurrentProject = '[Project] Clear Current Project',
    InitializeCurrentProject = '[Project] Initialize Current Project',
    AddProject = '[Project] Add Project',
    AddProjectSuccess = '[Project] Add Project Success',
    AddProjectFail = '[Project] Add Project Fail',
    UpdateProject = '[Project] Update Project',
    UpdateProjectSuccess = '[Project] Update Project Success',
    UpdateProjectFail = '[Project] Update Project Fail',
    DeleteProject = '[Project] Delete Project',
    DeleteProjectSuccess = '[Project] Delete Project Success',
    DeleteProjectFail = '[Project] Delete Project Fail'
}

export class Load implements Action {
    readonly type = ProjectActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProjectActionTypes.LoadSuccess;

    constructor(public payload: IProject[]) { }
}

export class LoadFail implements Action {
    readonly type = ProjectActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export class SetCurrentProject implements Action {
    readonly type = ProjectActionTypes.SetCurrentProject;

    constructor(public payload: IProject) { }
}

export class SetReadOnlyValue implements Action {
    readonly type = ProjectActionTypes.SetReadOnlyValue;

    constructor(public payload: boolean) { }
}

export class ClearCurrentProject implements Action {
    readonly type = ProjectActionTypes.ClearCurrentProject;
}

export class InitializeCurrentProject implements Action {
    readonly type = ProjectActionTypes.InitializeCurrentProject;
}

export class AddProject implements Action {
    readonly type = ProjectActionTypes.AddProject;

    constructor(public payload: IProject) { }
}

export class AddProjectSuccess implements Action {
    readonly type = ProjectActionTypes.AddProjectSuccess;

    constructor(public payload: IProject) { }
}

export class AddProjectFail implements Action {
    readonly type = ProjectActionTypes.AddProjectFail;

    constructor(public payload: string) { }
}

export class UpdateProject implements Action {
    readonly type = ProjectActionTypes.UpdateProject;

    constructor(public payload: IProject) { }
}

export class UpdateProjectSuccess implements Action {
    readonly type = ProjectActionTypes.UpdateProjectSuccess;

    constructor(public payload: IProject) { }
}

export class UpdateProjectFail implements Action {
    readonly type = ProjectActionTypes.UpdateProjectFail;

    constructor(public payload: string) { }
}

export class DeleteProject implements Action {
    readonly type = ProjectActionTypes.DeleteProject;

    constructor(public payload: number) { }
}

export class DeleteProjectSuccess implements Action {
    readonly type = ProjectActionTypes.DeleteProjectSuccess;
}

export class DeleteProjectFail implements Action {
    readonly type = ProjectActionTypes.DeleteProjectFail;

    constructor(public payload: string) { }
}

export type ProjectActions = Load
    | LoadSuccess
    | LoadFail
    | SetCurrentProject
    | SetReadOnlyValue
    | ClearCurrentProject
    | InitializeCurrentProject
    | AddProject
    | AddProjectSuccess
    | AddProjectFail
    | UpdateProject
    | UpdateProjectSuccess
    | UpdateProjectFail
    | DeleteProject
    | DeleteProjectSuccess
    | DeleteProjectFail;