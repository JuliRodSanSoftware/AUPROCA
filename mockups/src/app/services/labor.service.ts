import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { Labor } from '../models/labor';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaborService {
  private apiUrlLabors = `${Constants.API}/Labor/`;
  
  constructor(private http: HttpClient) { }
  
  createLabor(labor: Labor): Observable<any> {
    return this.http.post<any>(this.apiUrlLabors, labor);
  }

  getLabors(): Observable<Labor[]> {
    return this.http.get<{ results: Labor[] }>(this.apiUrlLabors)
      .pipe(
        map(response => response.results)
      );
  }

  getLaborDetail(id: string): Observable<Labor> {
    return this.http.get<Labor>(`${this.apiUrlLabors}${id}/`);
  }

  updateLabor(id: string, updatedLabor: Labor): Observable<Labor> {
    return this.http.put<Labor>(`${this.apiUrlLabors}${id}/`, updatedLabor);
    
  }

  deleteLabor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlLabors}${id}/`);
  }

}
