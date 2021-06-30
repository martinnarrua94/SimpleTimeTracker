import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState } from "./project.reducer";

const getProjectFeatureState = createFeatureSelector<ProjectState>('projects');

export const getProjects = createSelector(getProjectFeatureState, state => state.projects);

export const getCurrentProjectId = createSelector(getProjectFeatureState, state => state.currentProjectId);

export const getIsReadOnly = createSelector(getProjectFeatureState, state => state.readOnlyProject);

export const getCurrentProject = createSelector(
    getProjectFeatureState,
    getCurrentProjectId,
    (state, currentProjectId) => {
        if (currentProjectId == 0) {
            return {
                id: 0,
                name: '',
                notes: '',
                projectTasks: []
            };
        }
        else {
            return currentProjectId ? state.projects.find(p => p.id == currentProjectId) : null;
        }
    }
);

export const getError = createSelector(getProjectFeatureState, state => state.error);
