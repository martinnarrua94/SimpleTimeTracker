// Based on https://github.com/blove/ngrx-tour-of-heros/tree/ngrx-refactor-2

import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { Action } from "@ngrx/store";

export enum SnackbarActionTypes {
    SnackbarOpen = '[Snackbar] Open',
    SnackbarClose = '[Snackbar] Close'
}

export class SnackbarOpen implements Action {
  readonly type = SnackbarActionTypes.SnackbarOpen;

  constructor(public payload: {
    message: string,
    action?: string,
    config?: MatSnackBarConfig
  }) { }

}

export class SnackbarClose implements Action {
  readonly type = SnackbarActionTypes.SnackbarClose;
}

export type SnackbarActions = SnackbarOpen | SnackbarClose;