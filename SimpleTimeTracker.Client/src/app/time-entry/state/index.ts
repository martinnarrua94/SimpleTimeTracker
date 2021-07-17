import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TimeEntryState } from "./time-entry.reducer";

const getTimeEntryFeatureState = createFeatureSelector<TimeEntryState>('timeEntries');

export const getTimeEntries = createSelector(getTimeEntryFeatureState, state => state.timeEntries);

export const getCurrentTimeEntryId = createSelector(getTimeEntryFeatureState, state => state.currentTimeEntryId);

export const getTimeEntryStartDate = createSelector(getTimeEntryFeatureState, state => state.timeEntryStartDate);

export const getCurrentTimeEntry = createSelector(
    getTimeEntryFeatureState,
    getCurrentTimeEntryId,
    (state, currentTimeEntryId) => {
        if (currentTimeEntryId == 0) {
            return {
                id: 0,
                startDate: null,
                endDate: null,
                project: null,
                projectTask: null,
                notes: ''
            };
        }
        else {
            return currentTimeEntryId ? state.timeEntries.find(p => p.id == currentTimeEntryId) : null;
        }
    }
);

export const getError = createSelector(getTimeEntryFeatureState, state => state.error);
