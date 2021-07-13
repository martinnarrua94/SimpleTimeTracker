import { Action } from "@ngrx/store";
import { ITimeEntry } from "../interfaces/time-entry";
import { ITimeEntryCreate } from "../interfaces/time-entry-create";
import { ITimeEntryFilter } from "../interfaces/time-entry-filter";
import { ITimeEntryUpdate } from "../interfaces/time-entry-update";

export enum TimeEntryActionTypes {
    Load = '[Time Entry] Load',
    LoadSuccess = '[Time Entry] Load Success',
    LoadFail = '[Time Entry] Load Fail',
    SetCurrentTimeEntry = '[Time Entry] Set Current Time Entry',
    ClearCurrentTimeEntry = '[Time Entry] Clear Current Time Entry',
    InitializeCurrentTimeEntry = '[Time Entry] Initialize Current Time Entry',
    AddTimeEntry = '[Time Entry] Add Time Entry',
    AddTimeEntrySuccess = '[Time Entry] Add Time Entry Success',
    AddTimeEntryFail = '[Time Entry] Add Time Entry Fail',
    UpdateTimeEntry = '[Time Entry] Update Time Entry',
    UpdateTimeEntrySuccess = '[Time Entry] Update Time Entry Success',
    UpdateTimeEntryFail = '[Time Entry] Update Time Entry Fail',
    DeleteTimeEntry = '[Time Entry] Delete Time Entry',
    DeleteTimeEntrySuccess = '[Time Entry] Delete Time Entry Success',
    DeleteTimeEntryFail = '[Time Entry] Delete Time Entry Fail',
    FilterTimeEntries = '[Time Entry] Filter Time Entries',
    FilterTimeEntriesSuccess = '[Time Entry] Filter Time Entries Success',
    FilterTimeEntriesFail = '[Time Entry] Filter Time Entries Fail'
}

export class Load implements Action {
    readonly type = TimeEntryActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = TimeEntryActionTypes.LoadSuccess;

    constructor(public payload: ITimeEntry[]) { }
}

export class LoadFail implements Action {
    readonly type = TimeEntryActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export class SetCurrentTimeEntry implements Action {
    readonly type = TimeEntryActionTypes.SetCurrentTimeEntry;

    constructor(public payload: ITimeEntry) { }
}

export class ClearCurrentTimeEntry implements Action {
    readonly type = TimeEntryActionTypes.ClearCurrentTimeEntry;
}

export class InitializeCurrentTimeEntry implements Action {
    readonly type = TimeEntryActionTypes.InitializeCurrentTimeEntry;
}

export class AddTimeEntry implements Action {
    readonly type = TimeEntryActionTypes.AddTimeEntry;

    constructor(public payload: ITimeEntryCreate) { }
}

export class AddTimeEntrySuccess implements Action {
    readonly type = TimeEntryActionTypes.AddTimeEntrySuccess;

    constructor(public payload: ITimeEntry) { }
}

export class AddTimeEntryFail implements Action {
    readonly type = TimeEntryActionTypes.AddTimeEntryFail;

    constructor(public payload: string) { }
}

export class UpdateTimeEntry implements Action {
    readonly type = TimeEntryActionTypes.UpdateTimeEntry;

    constructor(public payload: ITimeEntryUpdate) { }
}

export class UpdateTimeEntrySuccess implements Action {
    readonly type = TimeEntryActionTypes.UpdateTimeEntrySuccess;

    constructor(public payload: ITimeEntry) { }
}

export class UpdateTimeEntryFail implements Action {
    readonly type = TimeEntryActionTypes.UpdateTimeEntryFail;

    constructor(public payload: string) { }
}

export class DeleteTimeEntry implements Action {
    readonly type = TimeEntryActionTypes.DeleteTimeEntry;

    constructor(public payload: number) { }
}

export class DeleteTimeEntrySuccess implements Action {
    readonly type = TimeEntryActionTypes.DeleteTimeEntrySuccess;
}

export class DeleteTimeEntryFail implements Action {
    readonly type = TimeEntryActionTypes.DeleteTimeEntryFail;

    constructor(public payload: string) { }
}

export class FilterTimeEntries implements Action {
    readonly type = TimeEntryActionTypes.FilterTimeEntries;

    constructor(public payload: ITimeEntryFilter) { }
}

export class FilterTimeEntriesSuccess implements Action {
    readonly type = TimeEntryActionTypes.FilterTimeEntriesSuccess;

    constructor(public payload: ITimeEntry[]) { }
}

export class FilterTimeEntriesFail implements Action {
    readonly type = TimeEntryActionTypes.FilterTimeEntriesFail;

    constructor(public payload: string) { }
}

export type TimeEntryActions = Load
    | LoadSuccess
    | LoadFail
    | SetCurrentTimeEntry
    | ClearCurrentTimeEntry
    | InitializeCurrentTimeEntry
    | AddTimeEntry
    | AddTimeEntrySuccess
    | AddTimeEntryFail
    | UpdateTimeEntry
    | UpdateTimeEntrySuccess
    | UpdateTimeEntryFail
    | DeleteTimeEntry
    | DeleteTimeEntrySuccess
    | DeleteTimeEntryFail
    | FilterTimeEntries
    | FilterTimeEntriesSuccess
    | FilterTimeEntriesFail;