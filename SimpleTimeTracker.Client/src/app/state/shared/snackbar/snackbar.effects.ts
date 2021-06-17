// Based on https://github.com/blove/ngrx-tour-of-heros/tree/ngrx-refactor-2

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, map, tap } from "rxjs/operators";
import * as snackbarActions from './snackbar.actions';

@Injectable({providedIn: 'root'})
export class SnackbarEffects {
    constructor(private actions$: Actions,
        private matSnackBar: MatSnackBar) {}

    closeSnackbar$ = createEffect(
        () => this.actions$.pipe(
            ofType(snackbarActions.SnackbarActionTypes.SnackbarClose),
            tap(() => this.matSnackBar.dismiss())
        ),
        { dispatch: false }
    );

    showSnackbar$ = createEffect(
        () => this.actions$.pipe(
            ofType(snackbarActions.SnackbarActionTypes.SnackbarOpen),
            map((action: snackbarActions.SnackbarOpen) => action.payload),
            tap(payload => this.matSnackBar.open(payload.message, payload.action, payload.config)),
            delay(5000),
            map(() => new snackbarActions.SnackbarClose())
        ));
  
}