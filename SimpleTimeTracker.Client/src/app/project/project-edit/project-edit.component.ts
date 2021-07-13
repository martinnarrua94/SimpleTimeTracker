import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State } from 'src/app/state/app.state';
import { IProject } from '../project';
import * as projectActions from '../state/project.actions';
import * as fromProject from '../state';
import { Router } from '@angular/router';
import { IProjectTask } from 'src/app/project-task/interfaces/project-task';
import * as projectTaskActions from '../../project-task/state/project-task.actions';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  
  projectForm: FormGroup;
  project$: Observable<IProject | null>;
  projectTasks: IProjectTask[];
  pageTitle: string;
  isReadOnly: boolean;
  backButtonColor: string;
  backButtonIcon: string;
  backButtonLabel: string;

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      notes: ['']  
    });
    
    this.store.select(fromProject.getIsReadOnly).subscribe(
      isReadOnly => this.isReadOnly = isReadOnly
    );

    this.project$ = this.store.select(fromProject.getCurrentProject)
      .pipe(
        tap(currentProject => {
          this.displayProject(currentProject);
          this.projectTasks = currentProject.projectTasks;
        })    
    );

    this.backButtonLabel = this.isReadOnly ? "Atras" : "Cancelar";
    this.backButtonIcon = this.isReadOnly ? "chevron_left" : "cancel";
    this.backButtonColor = this.isReadOnly ? "accent" : "warn";
  }

  displayProject(project: IProject | null): void{
    if (project) {
      this.projectForm.reset();

      if (project.id == 0) {
        this.pageTitle = "Crear nuevo proyecto";
      }
      else {
        this.pageTitle = this.isReadOnly ? `Informacion del proyecto ${project.name}` : `Editar Proyecto: ${project.name}`;
      }

      this.projectForm.patchValue({
        name: project.name,
        notes: project.notes
      });
    }
  }

  saveProject(originalProject: IProject): void {
    if (this.projectForm.valid) {
      const project = { ...originalProject, ...this.projectForm.value }
      
      if (project.id == 0) {
        this.store.dispatch(new projectActions.AddProject(project));
      }
      else {
        this.store.dispatch(new projectActions.UpdateProject(project));
      }

      this.router.navigate(["/projects"]);
    }
  }

  editProjectTasks(projectId: number) {
    this.store.dispatch(new projectTaskActions.SetProjectIdFilter(projectId));
  }

}
