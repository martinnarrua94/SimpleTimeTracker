import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITimeEntry } from './interfaces/time-entry';
import { ITimeEntryCreate } from './interfaces/time-entry-create';
import { ITimeEntryFilter } from './interfaces/time-entry-filter';
import { ITimeEntryUpdate } from './interfaces/time-entry-update';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

  private APIURL = `${environment.apiUrl}TimeEntries`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ITimeEntry[]> {
    return this.http.get<ITimeEntry[]>(this.APIURL).pipe(
      map((response: ITimeEntry[]) => {
        return response;
      })
    )
  }

  getByFilter(filter: ITimeEntryFilter): Observable<ITimeEntry[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ITimeEntry[]>(`${this.APIURL}/byFilter`, filter, {headers}).pipe(
      map((response: ITimeEntry[]) => {
        return response;
      })
    )
  }

  createTimeEntry(newTimeEntry: ITimeEntryCreate): Observable<ITimeEntry> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ITimeEntry>(this.APIURL, newTimeEntry, { headers })
      .pipe(
        map((response: ITimeEntry) => {
          return response;
        })
    );
  }

  updateTimeEntry(timeEntry: ITimeEntryUpdate): Observable<ITimeEntry>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ITimeEntry>(`${this.APIURL}/${timeEntry.id}`, timeEntry, { headers })
      .pipe(
        map((response: ITimeEntry) => {
          return response;
        })
    );
  }

  deleteTimeEntry(timeEntryId: number): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.APIURL}/${timeEntryId}`, { headers })
      .pipe(
        map((response) => {
          return response;
        })
    );
  }
}
