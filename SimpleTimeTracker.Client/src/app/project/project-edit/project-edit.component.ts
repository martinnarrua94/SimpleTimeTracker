import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State } from 'src/app/state/app.state';
import { IProject } from '../project';
import * as projectActions from '../state/project.actions';
import { getCurrentProject, getIsReadOnly } from '../state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  
  projectForm: FormGroup;
  project$: Observable<IProject | null>
  pageTitle: string;
  isReadOnly: boolean;

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      notes: ['']  
    });

    
    this.store.select(getIsReadOnly).subscribe(
      isReadOnly => this.isReadOnly = isReadOnly
    );

    this.project$ = this.store.select(getCurrentProject)
      .pipe(
        tap(currentProject => this.displayProject(currentProject))
    );
  }

  displayProject(project: IProject | null): void{
    if (project) {
      this.projectForm.reset();

      if (project.id == 0) {
        this.pageTitle = "Crear nuevo proyecto";
      }
      else {
        this.pageTitle = this.isReadOnly ? `Informacion del projecto ${project.name}` : `Editar Proyecto: ${project.name}`;
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

}
