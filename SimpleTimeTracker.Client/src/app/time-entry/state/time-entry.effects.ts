import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { SnackbarOpen } from "src/app/state/shared/snackbar/snackbar.actions";
import { ITimeEntry } from "../interfaces/time-entry";
import { ITimeEntryCreate } from "../interfaces/time-entry-create";
import { ITimeEntryUpdate } from "../interfaces/time-entry-update";
import { TimeEntryService } from "../time-entry.service";
import * as timeEntryActions from '../state/time-entry.actions';

@Injectable({ providedIn: 'root' })
export class TimeEntryEffects {
    constructor(private actions$: Actions, private timeEntryService: TimeEntryService) { }
    
    loadTimeEntries$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.Load),
            mergeMap((action: timeEntryActions.Load) =>
                this.timeEntryService.getAll().pipe(
                    map((timeEntries: ITimeEntry[]) => (new timeEntryActions.LoadSuccess(timeEntries))),
                    catchError(error => of(new timeEntryActions.LoadFail(error)))
                ))
        )
    );

    addTimeEntry$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.AddTimeEntry),
            map((action: timeEntryActions.AddTimeEntry) => action.payload),
            mergeMap((timeEntry: ITimeEntryCreate) =>
                this.timeEntryService.createTimeEntry(timeEntry).pipe(
                    map((createdTimeEntry: ITimeEntry) => (new timeEntryActions.AddTimeEntrySuccess(createdTimeEntry))),
                    catchError(error => of(new timeEntryActions.AddTimeEntryFail(error)))
                ))
        )
    );

    updateTimeEntry$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.UpdateTimeEntry),
            map((action: timeEntryActions.UpdateTimeEntry) => action.payload),
            mergeMap((timeEntry: ITimeEntryUpdate) =>
                this.timeEntryService.updateTimeEntry(timeEntry).pipe(
                    map((updatedTimeEntry: ITimeEntry) => (new timeEntryActions.UpdateTimeEntrySuccess(updatedTimeEntry))),
                    catchError(error => of(new timeEntryActions.UpdateTimeEntryFail(error)))
                ))
        )
    );

    deleteTimeEntry$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.DeleteTimeEntry),
            map((action: timeEntryActions.DeleteTimeEntry) => action.payload),
            mergeMap((timeEntryId: number) =>
                this.timeEntryService.deleteTimeEntry(timeEntryId).pipe(
                    map(() => (new timeEntryActions.DeleteTimeEntrySuccess())),
                    catchError(error => of(new timeEntryActions.UpdateTimeEntryFail(error)))
                ))
        )
    );

    addTimeEntrySuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.AddTimeEntrySuccess),
            map(() => new SnackbarOpen({
                message: 'Time Entry created successfully',
                action: 'Success'
            })),
        )
    );

    updateTimeEntrySuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.UpdateTimeEntrySuccess),
            map(() => new SnackbarOpen({
                message: 'Time Entry updated successfully',
                action: 'Success'
            })),
        )
    );

    deleteTimeEntrySuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(timeEntryActions.TimeEntryActionTypes.DeleteTimeEntrySuccess),
            map(() => new SnackbarOpen({
                message: 'Time Entry deleted successfully',
                action: 'Success'
            })),
        )
    );
}