import { Action } from "@ngrx/store";
import { IProject } from "../project";

export enum ProjectActionTypes{
    Load = '[Project] Load',
    LoadSuccess = '[Project] Load Success',
    LoadFail = '[Project] Load Fail',
    SetCurrentProject = '[Project] Set Current Project',
    ClearCurrentProject = '[Project] Clear Current Project',
    InitializeCurrentProject = '[Project] Initialize Current Project'
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

export class ClearCurrentProject implements Action {
    readonly type = ProjectActionTypes.ClearCurrentProject;
}

export class InitializeCurrentProject implements Action {
    readonly type = ProjectActionTypes.InitializeCurrentProject;
}

export type ProjectActions = Load
    | LoadSuccess
    | LoadFail
    | SetCurrentProject
    | ClearCurrentProject
    | InitializeCurrentProject;