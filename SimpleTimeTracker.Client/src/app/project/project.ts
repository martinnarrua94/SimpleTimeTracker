import { IProjectTask } from "../project-task/interfaces/project-task";

export interface IProject{
    id: number;
    name: string;
    notes: string;
    projectTasks: IProjectTask[];
}