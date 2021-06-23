import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectTaskState } from "./project-task.reducer";

const getProjectTaskFeatureState = createFeatureSelector<ProjectTaskState>('projectTasks');

export const getCurrentProjectTaskId = createSelector(getProjectTaskFeatureState, state => state.currentProjectTaskId);

export const getProjectIdFilter = createSelector(getProjectTaskFeatureState, state => state.projectIdFilter);

export const getProjectTasks = createSelector(
    getProjectTaskFeatureState,
    getProjectIdFilter,
    (state, projectIdFilter) => {
        return projectIdFilter != null ? state.projectTasks.filter(p => p.project.id == projectIdFilter) : state.projectTasks;
    });

export const getCurrentProjectTask = createSelector(
    getProjectTaskFeatureState,
    getCurrentProjectTaskId,
    (state, currentProjectTaskId) => {
        if (currentProjectTaskId == 0) {
            return {
                id: 0,
                project: null,
                name: '',
                notes: ''
            };
        }
        else {
            return currentProjectTaskId ? state.projectTasks.find(p => p.id == currentProjectTaskId) : null;
        }
    }
);

export const getError = createSelector(getProjectTaskFeatureState, state => state.error);