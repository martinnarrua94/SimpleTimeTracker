import { IProject } from "../project";
import { ProjectActions, ProjectActionTypes } from "./project.actions";

export interface ProjectState{
    projects: IProject[];
    currentProjectId: number | null;
    readOnlyProject: boolean;
    error: string;
}

const initialState: ProjectState = {
    projects: [],
    currentProjectId: null,
    readOnlyProject: false,
    error: ''
}

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
        
        case ProjectActionTypes.SetReadOnlyValue:
            return {
                ...state,
                readOnlyProject: action.payload
            };
        
        case ProjectActionTypes.InitializeCurrentProject:
            return {
                ...state,
                currentProjectId: 0,
                readOnlyProject: false
            }; 
        
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