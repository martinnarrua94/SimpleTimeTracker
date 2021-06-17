// Based on https://github.com/blove/ngrx-tour-of-heros/tree/ngrx-refactor-2

import { SnackbarActions, SnackbarActionTypes } from "./snackbar.actions";

export interface SnackbarState {
  show: boolean;
}

const initialState: SnackbarState = {
  show: false
}

export function reducer(state: SnackbarState = initialState, action: SnackbarActions) {
  switch(action.type) {
    case SnackbarActionTypes.SnackbarClose:
          return { ...state, show: false };
      
    case SnackbarActionTypes.SnackbarOpen:
          return { ...state, show: true };
      
    default:
      return state;
  }
}