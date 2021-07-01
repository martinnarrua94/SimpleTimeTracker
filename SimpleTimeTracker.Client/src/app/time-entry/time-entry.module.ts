import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeEntryListComponent } from './time-entry-list/time-entry-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'time-entries',
    children: [
      { path: '', component: TimeEntryListComponent }
    ]
  }   
];

@NgModule({
  declarations: [
    TimeEntryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TimeEntryListComponent
  ]
})
export class TimeEntryModule { }
