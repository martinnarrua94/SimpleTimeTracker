import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeEntryListComponent } from './time-entry-list/time-entry-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/time-entry.reducer';
import { TimeEntryEffects } from './state/time-entry.effects';
import { EffectsModule } from '@ngrx/effects';
import { TimeEntryAddComponent } from './time-entry-add/time-entry-add.component';
import { TimeEntryAddGuard } from './time-entry-add/time-entry-add.guard';

const routes: Routes = [
  {
    path: 'time-entries',
    children: [
      { path: '', component: TimeEntryListComponent },
      {
        path: 'add',
        component: TimeEntryAddComponent,
        canDeactivate: [TimeEntryAddGuard]
      }
    ]
  }   
];

@NgModule({
  declarations: [
    TimeEntryListComponent,
    TimeEntryAddComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule,
    StoreModule.forFeature('timeEntries', reducer),
    EffectsModule.forFeature([TimeEntryEffects]),
    RouterModule.forChild(routes)
  ],
  exports: [
    TimeEntryListComponent
  ]
})
export class TimeEntryModule { }
