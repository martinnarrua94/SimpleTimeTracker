import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State } from 'src/app/state/app.state';
import { IProject } from '../project';
import * as projectActions from '../state/project.actions';
import { getCurrentProject } from '../state/project.reducer';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  
  projectForm: FormGroup;
  project$: Observable<IProject | null>
  pageTitle: string;

  constructor(private fb: FormBuilder, private store: Store<State>) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      notes: ['']  
    });

    this.project$ = this.store.select(getCurrentProject)
      .pipe(
        tap(currentProject => this.displayProject(currentProject))
      );
  }

  displayProject(project: IProject | null): void{
    if (project) {
      this.projectForm.reset();

      this.pageTitle = project.id == 0 ? "Crear nuevo proyecto" : `Edit Proyecto: ${project.name}`;

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
    }
  }

}
