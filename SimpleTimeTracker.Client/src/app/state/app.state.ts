import { ProjectTaskState } from "../project-task/state/project-task.reducer";
import { ProjectState } from "../project/state/project.reducer";
import { TimeEntryState } from "../time-entry/state/time-entry.reducer";
import { SnackbarState } from "./shared/snackbar/snackbar.reducer";

export interface State {
    projects: ProjectState;
    projectTasks: ProjectTaskState;
    timeEntries: TimeEntryState;
    snackbar: SnackbarState;
}