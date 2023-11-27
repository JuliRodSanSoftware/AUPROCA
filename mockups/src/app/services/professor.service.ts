import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { Professor } from '../models/professor';
import { ProfessorData } from '../models/professorData';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private apiUrlProffessors = `${Constants.API}/usuarios/`;

  constructor(private http: HttpClient) { }

  createProfessor(professor: Professor): Observable<any> {

    let sendData = new ProfessorData(
      professor.identificationNumber,
      professor.firstName,
      professor.lastName,
      professor.gender,
      professor.lastAcademicTitle,
      professor.email  // Toca mejorar una parte del login para ello
    );
    
    return this.http.post<any>(this.apiUrlProffessors, sendData);
  }


  getProfessors(): Observable<ProfessorData[]> {
    return this.http.get<{ results: ProfessorData[] }>(this.apiUrlProffessors)
      .pipe(
        map(response => response.results)
      );
  }

  getProfessorDetail(id: string): Observable<ProfessorData> {
    return this.http.get<ProfessorData>(`${this.apiUrlProffessors}${id}/`);
  }

  updateProfessor(id: string, updatedProfessor: ProfessorData): Observable<ProfessorData> {
    return this.http.put<ProfessorData>(`${this.apiUrlProffessors}${id}/`, updatedProfessor);
    
  }

  deleteProfessor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlProffessors}${id}/`);
  }

}
