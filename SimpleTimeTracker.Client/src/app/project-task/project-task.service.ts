import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProjectTask } from './project-task';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  private APIURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProjectTask[]> {
    return this.http.get<IProjectTask[]>(`${this.APIURL}ProjectTasks`).pipe(
      map((response: IProjectTask[]) => {
        return response;
      })
    )
  }
}
