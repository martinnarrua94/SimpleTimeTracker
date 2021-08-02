import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeEntryAddComponent } from './time-entry/time-entry-add/time-entry-add.component';

const routes: Routes = [
  { path: '', component: TimeEntryAddComponent },
  { path: '**', component: TimeEntryAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
