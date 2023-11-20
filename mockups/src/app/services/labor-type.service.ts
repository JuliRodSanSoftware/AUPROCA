import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { Observable, map } from 'rxjs';
import { LaborType } from '../models/laborType';

@Injectable({
  providedIn: 'root'
})
export class LaborTypeService {
  private apiUrlLabors = `${Constants.API}/tipoLabor/`;
  
  constructor(private http: HttpClient) { }
  
  createLabor(laborType: LaborType): Observable<any> {
    return this.http.post<any>(this.apiUrlLabors, laborType);
  }

  getLaborTypes(): Observable<LaborType[]> {
    return this.http.get<{ results: LaborType[] }>(this.apiUrlLabors)
      .pipe(
        map(response => response.results)
      );
  }

  getLaborTypeDetail(id: string): Observable<LaborType> {
    return this.http.get<LaborType>(`${this.apiUrlLabors}${id}/`);
  }

  updateLaborType(id: string, updatedLaborType: LaborType): Observable<LaborType> {
    return this.http.put<LaborType>(`${this.apiUrlLabors}${id}/`, updatedLaborType);
    
  }

  deleteLaborType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlLabors}${id}/`);
  }
}
