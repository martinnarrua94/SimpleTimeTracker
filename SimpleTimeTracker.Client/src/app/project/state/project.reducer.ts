import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProject } from "../project";
import { ProjectActions, ProjectActionTypes } from "./project.actions";

export interface ProjectState{
    projects: IProject[];
    currentProject: IProject;
    error: string;
}

const initialState: ProjectState = {
    projects: [],
    currentProject: null,
    error: ''
}

const getProjectFeatureState = createFeatureSelector<ProjectState>('projects');

export const getProjects = createSelector(getProjectFeatureState, state => state.projects);

export const getCurrentProject = createSelector(getProjectFeatureState, state => state.currentProject);

export const getError = createSelector(getProjectFeatureState, state => state.error);

export function reducer(state: ProjectState = initialState, action: ProjectActions): ProjectState {
    switch (action.type) {
        case ProjectActionTypes.LoadSuccess:
            return {
                ...state,
                projects: action.payload,
                error: ''
            };
        
        case ProjectActionTypes.LoadFail:
            return {
                ...state,
                projects: [],
                error: action.payload
            }
        
        case ProjectActionTypes.SetCurrentProject:
            return {
                ...state,
                currentProject: { ...action.payload }
            };
        
        case ProjectActionTypes.InitializeCurrentProject:
            return {
                ...state,
                currentProject: {
                    id: 0,
                    name: '',
                    notes: ''
                }
            }
        
        default:
            return state;
    }
}