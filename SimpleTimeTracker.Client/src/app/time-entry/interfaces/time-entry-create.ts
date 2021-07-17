export interface ITimeEntryCreate {
    endDate: Date | null;
    projectId: number;
    projectTaskId: number;
    notes: string | null;
 }