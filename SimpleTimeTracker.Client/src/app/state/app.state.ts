import { ProjectTaskState } from "../project-task/state/project-task.reducer";
import { ProjectState } from "../project/state/project.reducer";
import { SnackbarState } from "./shared/snackbar/snackbar.reducer";

export interface State{
    projects: ProjectState;
    projectTasks: ProjectTaskState;
    snackbar: SnackbarState;
}