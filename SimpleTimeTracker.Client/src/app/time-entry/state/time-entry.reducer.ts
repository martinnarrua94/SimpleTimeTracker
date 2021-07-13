import { ITimeEntry } from "../interfaces/time-entry";
import { TimeEntryActions, TimeEntryActionTypes } from "./time-entry.actions";

export interface TimeEntryState {
    timeEntries: ITimeEntry[];
    currentTimeEntryId: number | null;
    error: string;
}

const initialState: TimeEntryState = {
    timeEntries: [],
    currentTimeEntryId: null,
    error: ''
}

export function reducer(state: TimeEntryState = initialState, action: TimeEntryActions): TimeEntryState {
    switch (action.type) {
        case TimeEntryActionTypes.LoadSuccess:
            return {
                ...state,
                timeEntries: action.payload,
                error: ''
            };
        
        case TimeEntryActionTypes.LoadFail:
            return {
                ...state,
                timeEntries: [],
                error: action.payload
            };
        
        case TimeEntryActionTypes.FilterTimeEntriesSuccess:
            return {
                ...state,
                timeEntries: action.payload,
                error: ''
            };
        
        case TimeEntryActionTypes.FilterTimeEntriesFail:
            return {
                ...state,
                timeEntries: [],
                error: action.payload
            };
        
        case TimeEntryActionTypes.SetCurrentTimeEntry:
            return {
                ...state,
                currentTimeEntryId: action.payload.id
            };
        
        case TimeEntryActionTypes.InitializeCurrentTimeEntry:
            return {
                ...state,
                currentTimeEntryId: 0
            };
        
        case TimeEntryActionTypes.AddTimeEntrySuccess:
            return {
                ...state,
                timeEntries: [...state.timeEntries, action.payload],
                currentTimeEntryId: action.payload.id,
                error: ''
            };
        
        case TimeEntryActionTypes.AddTimeEntryFail:
            return {
                ...state,
                error: action.payload
            };
        
        case TimeEntryActionTypes.UpdateTimeEntrySuccess:
            const updatedTimeEntries = state.timeEntries.map(
                item => action.payload.id == item.id ? action.payload : item);
            return {
                ...state,
                timeEntries: updatedTimeEntries,
                currentTimeEntryId: action.payload.id,
                error: ''
            };
        
        case TimeEntryActionTypes.UpdateTimeEntryFail:
            return {
                ...state,
                error: action.payload
            };
        
        case TimeEntryActionTypes.DeleteTimeEntrySuccess:
            const remainingTimeEntries = state.timeEntries.filter(
                x => x.id != state.currentTimeEntryId
            );
            return {
                ...state,
                timeEntries: remainingTimeEntries,
                currentTimeEntryId: null,
                error: ''
            };
        
        case TimeEntryActionTypes.DeleteTimeEntryFail:
            return {
                ...state,
                error: action.payload
            };
            
        
        default:
            return state;
    }
}