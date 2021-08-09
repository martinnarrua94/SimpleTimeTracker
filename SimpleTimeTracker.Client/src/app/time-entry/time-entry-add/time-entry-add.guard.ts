import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { TimeEntryAddComponent } from './time-entry-add.component';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryAddGuard implements CanDeactivate<TimeEntryAddComponent> {

  constructor(public dialog: MatDialog){}

  canDeactivate(
    component: TimeEntryAddComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (component.timerActive)
    {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '400px',
          data: { message: "Se está realizando un registro de tiempo. Si abandona la página, perderá los cambios en el registro" }
        });
        
        return dialogRef.afterClosed()
    }

    return true;
  }
  
}
