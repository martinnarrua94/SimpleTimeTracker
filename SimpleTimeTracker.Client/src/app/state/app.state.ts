import { ProjectState } from "../project/state/project.reducer";
import { SnackbarState } from "./shared/snackbar/snackbar.reducer";

export interface State{
    projects: ProjectState;
    snackbar: SnackbarState
}