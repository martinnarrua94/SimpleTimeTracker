import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IProject } from 'src/app/project/project';
import { getProjects } from 'src/app/project/state';
import { State } from 'src/app/state/app.state';
import { IProjectTask } from '../interfaces/project-task';
import { IProjectTaskCreate } from '../interfaces/project-task-create';
import { IProjectTaskUpdate } from '../interfaces/project-task-update';
import { getCurrentProjectTask } from '../state';
import * as projectTaskActions from '../state/project-task.actions';

@Component({
  selector: 'app-project-task-edit',
  templateUrl: './project-task-edit.component.html',
  styleUrls: ['./project-task-edit.component.css']
})
export class ProjectTaskEditComponent implements OnInit {

  projectTaskForm: FormGroup;
  projectTask$: Observable<IProjectTask | null>;
  projects$: Observable<IProject[] | null>;
  pageTitle: string;
  isNewProjectTask: boolean;

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
    this.projectTaskForm = this.fb.group({
      name: ['', Validators.required],
      project: [null, Validators.required],
      notes: ['']
    });

    this.projectTask$ = this.store.select(getCurrentProjectTask)
      .pipe(
        tap(currentProjectTask => this.displayProjectTask(currentProjectTask))
    );

    this.projects$ = this.store.select(getProjects);
  }

  displayProjectTask(projectTask: IProjectTask | null): void{
    if (projectTask) {
      this.projectTaskForm.reset();

      this.pageTitle = projectTask.id == 0 ? "Crear nueva tarea" : `Editar Tarea: ${projectTask.name}`;

      this.isNewProjectTask = projectTask.id == 0;

      this.projectTaskForm.patchValue({
        name: projectTask.name,
        notes: projectTask.notes,
        project: projectTask.project
      });
    }
  }

  saveProjectTask(originalProjectTask: IProjectTask): void {
    if (this.projectTaskForm.valid) {
      const projectTask = { ...originalProjectTask, ...this.projectTaskForm.value }

      if (projectTask.id == 0) {
        let projectTaskToCreate: IProjectTaskCreate = {
          projectId: projectTask.project.id,
          name: projectTask.name,
          notes: projectTask.notes
        }

        this.store.dispatch(new projectTaskActions.AddProjectTask(projectTaskToCreate));
      }
      else {
        let projectTaskToUpdate: IProjectTaskUpdate = {
          id: projectTask.id,
          name: projectTask.name,
          notes: projectTask.notes
        }

        this.store.dispatch(new projectTaskActions.UpdateProjectTask(projectTaskToUpdate));
      }

      this.router.navigate(["/project-tasks"]);
    }
  }

}
