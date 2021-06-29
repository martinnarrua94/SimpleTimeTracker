import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProjectTask } from './interfaces/project-task';
import { IProjectTaskCreate } from './interfaces/project-task-create';
import { IProjectTaskUpdate } from './interfaces/project-task-update';


@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  private APIURL = `${environment.apiUrl}ProjectTasks`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProjectTask[]> {
    return this.http.get<IProjectTask[]>(this.APIURL).pipe(
      map((response: IProjectTask[]) => {
        return response;
      })
    )
  }

  createProjectTask(newProjectTask: IProjectTaskCreate): Observable<IProjectTask> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IProjectTask>(this.APIURL, newProjectTask, { headers })
      .pipe(
        map((response: IProjectTask) => {
          return response;
        })
    );
  }

  updateProjectTask(projectTask: IProjectTaskUpdate): Observable<IProjectTask>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IProjectTask>(`${this.APIURL}/${projectTask.id}`, projectTask, { headers })
      .pipe(
        map((response: IProjectTask) => {
          return response;
        })
    );
  }

  deleteProjectTask(projectTaskId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.APIURL}/${projectTaskId}`, { headers })
      .pipe(
        map((response) => {
          return response;
        })
    );
  }
}
