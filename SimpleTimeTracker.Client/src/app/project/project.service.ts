import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProject } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private APIURL = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.APIURL}Projects`).pipe(
      map((response: IProject[]) => {
        return response;
      })
    );
  }

  createProject(project: IProject): Observable<IProject> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newProject = { ...project, id: null };
    return this.http.post<IProject>(`${this.APIURL}Projects`, newProject, { headers })
      .pipe(
        map((response: IProject) => {
          return response;
        })
    );
  }

  updateProject(project: IProject): Observable<IProject>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IProject>(`${this.APIURL}Projects/${project.id}`, project, { headers })
      .pipe(
        map((response: IProject) => {
          return response;
        })
    );
  }
}
