import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTaskListComponent } from './project-task-list/project-task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/project-task.reducer';
import { ProjectTaskEffects } from './state/project-task.effects';
import { AppMaterialModule } from '../app-material.module';

const routes: Routes = [
  {
    path: 'project-tasks',
    children: [
      { path: '', component: ProjectTaskListComponent }
      //{ path: 'edit', component: ProjectEditComponent }
    ]
  }   
];

@NgModule({
  declarations: [
    ProjectTaskListComponent,    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule,
    StoreModule.forFeature('projectTasks', reducer),
    EffectsModule.forFeature([ProjectTaskEffects]),
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectTaskListComponent
  ]
})
export class ProjectTaskModule { }
