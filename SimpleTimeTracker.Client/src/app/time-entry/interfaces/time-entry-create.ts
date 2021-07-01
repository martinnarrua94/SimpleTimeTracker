export interface ITimeEntryCreate {
    startDate: Date;
    endDate: Date | null;
    projectId: number;
    projectTaskId: number;
    notes: string | null;
 }