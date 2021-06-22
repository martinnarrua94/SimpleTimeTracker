import { IProject } from "../project/project";

export interface IProjectTask {
    id: number;
    project: IProject;
    name: string;
    notes: string;
}