import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProject } from "../project";
import { ProjectActions, ProjectActionTypes } from "./project.actions";

export interface ProjectState{
    projects: IProject[];
    currentProjectId: number | null;
    error: string;
}

const initialState: ProjectState = {
    projects: [],
    currentProjectId: null,
    error: ''
}

const getProjectFeatureState = createFeatureSelector<ProjectState>('projects');

export const getProjects = createSelector(getProjectFeatureState, state => state.projects);

export const getCurrentProjectId = createSelector(getProjectFeatureState, state => state.currentProjectId);

export const getCurrentProject = createSelector(
    getProjectFeatureState,
    getCurrentProjectId,
    (state, currentProjectId) => {
        if (currentProjectId == 0) {
            return {
                id: 0,
                name: '',
                notes: ''
            };
        }
        else {
            return currentProjectId ? state.projects.find(p => p.id == currentProjectId) : null;
        }
    }
);

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
                currentProjectId: action.payload.id
            };
        
        case ProjectActionTypes.InitializeCurrentProject:
            return {
                ...state,
                currentProjectId: 0
            }
        
            case ProjectActionTypes.AddProjectSuccess:
                return {
                    ...state,
                    projects: [...state.projects, action.payload],
                    currentProjectId: action.payload.id,
                    error: ''
                };
            
            case ProjectActionTypes.AddProjectFail:
                return {
                    ...state,
                    error: action.payload
                };
        
        case ProjectActionTypes.UpdateProjectSuccess:
            const updatedProjects = state.projects.map(
                item => action.payload.id == item.id ? action.payload : item);
            return {
                ...state,
                projects: updatedProjects,
                currentProjectId: action.payload.id,
                error: ''
            };
        
        case ProjectActionTypes.UpdateProjectFail:
            return {
                ...state,
                error: action.payload
            };
            
        
        default:
            return state;
    }
}