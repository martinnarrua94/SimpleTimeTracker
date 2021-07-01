import { IProjectTask } from "src/app/project-task/interfaces/project-task";
import { IProject } from "src/app/project/project";

export interface ITimeEntry {
    id: number;
    startDate: Date;
    endDate: Date | null;
    project: IProject;
    projectTask: IProjectTask;
    notes: string | null;
 }