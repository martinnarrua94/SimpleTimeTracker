import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './project/state/project.effects';
import { ProjectModule } from './project/project.module';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { SnackbarEffects } from './state/shared/snackbar/snackbar.effects';
import { ProjectTaskEffects } from './project-task/state/project-task.effects';
import { ProjectTaskModule } from './project-task/project-task.module';
import { AppMaterialModule } from './app-material.module';
import { TimeEntryModule } from './time-entry/time-entry.module';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    ProjectModule,
    ProjectTaskModule,
    TimeEntryModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ProjectEffects, ProjectTaskEffects, SnackbarEffects]),
    StoreDevtoolsModule.instrument({
      name: 'SimpleTimeTracker DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
