import { IProjectTask } from "../interfaces/project-task";
import { ProjectTaskActions, ProjectTaskActionTypes } from "./project-task.actions";

export interface ProjectTaskState {
    projectTasks: IProjectTask[];
    currentProjectTaskId: number | null;
    projectIdFilter: number | null;
    error: string;
}

const initialState: ProjectTaskState = {
    projectTasks: [],
    currentProjectTaskId: null,
    projectIdFilter: null,
    error: ''
}

export function reducer(state: ProjectTaskState = initialState, action: ProjectTaskActions): ProjectTaskState {
    switch (action.type) {
        case ProjectTaskActionTypes.LoadSuccess:
            return {
                ...state,
                projectTasks: action.payload,
                error: ''
            };
        
        case ProjectTaskActionTypes.LoadFail:
            return {
                ...state,
                projectTasks: [],
                error: action.payload
            };
        
        case ProjectTaskActionTypes.SetCurrentProjectTask:
            return {
                ...state,
                currentProjectTaskId: action.payload.id
            };
        
        case ProjectTaskActionTypes.SetProjectIdFilter:
            return {
                ...state,
                projectIdFilter: action.payload
            };
        
        case ProjectTaskActionTypes.InitializeCurrentProjectTask:
            return {
                ...state,
                currentProjectTaskId: 0
            };
        
        case ProjectTaskActionTypes.AddProjectTaskSuccess:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
                currentProjectTaskId: action.payload.id,
                error: ''
            };
        
        case ProjectTaskActionTypes.AddProjectTaskFail:
            return {
                ...state,
                error: action.payload
            };
        
        case ProjectTaskActionTypes.UpdateProjectTaskSuccess:
            const updatedProjectTasks = state.projectTasks.map(
                item => action.payload.id == item.id ? action.payload : item);
            return {
                ...state,
                projectTasks: updatedProjectTasks,
                currentProjectTaskId: action.payload.id,
                error: ''
            };
        
        case ProjectTaskActionTypes.UpdateProjectTaskFail:
            return {
                ...state,
                error: action.payload
            };
        
        case ProjectTaskActionTypes.DeleteProjectTaskSuccess:
            const remainingProjectTasks = state.projectTasks.filter(
                x => x.id != state.currentProjectTaskId
            );
            return {
                ...state,
                projectTasks: remainingProjectTasks,
                currentProjectTaskId: null,
                error: ''
            };
        
        case ProjectTaskActionTypes.DeleteProjectTaskFail:
            return {
                ...state,
                error: action.payload
            };
            
        
        default:
            return state;
    }
}