import { HttpClient } from '@angular/common/http';
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
}
