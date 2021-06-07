import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';
import { reducer } from './state/project.reducer';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ProjectListComponent } from './project-list/project-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects',
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'edit', component: ProjectEditComponent }
    ]
  }   
];

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    StoreModule.forFeature('projects', reducer),
    EffectsModule.forFeature([ProjectEffects]),
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectModule { }
