import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { EvaluationC } from '../models/evaluationComplete';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelfAssessmentService {
  private apiUrlSelfAssessment = `${Constants.API}/Evaluacion/`;

  constructor(private http: HttpClient) { }

  createSelfAssessment(evaluation: EvaluationC): Observable<any> {

    return this.http.post<any>(this.apiUrlSelfAssessment, evaluation);
  }

  getSelfAssessments(): Observable<EvaluationC[]> {
    return this.http.get<{ results: EvaluationC[] }>(this.apiUrlSelfAssessment)
      .pipe(
        map(response => response.results)
      );
  }

  getSelfAssessmentDetail(id: string): Observable<EvaluationC> {
    return this.http.get<EvaluationC>(`${this.apiUrlSelfAssessment}${id}/`);
  }

  updateSelfAssessment(id: string, updatedProfessor: EvaluationC): Observable<EvaluationC> {
    return this.http.put<EvaluationC>(`${this.apiUrlSelfAssessment}${id}/`, updatedProfessor);
    
  }

  deleteSelfAssessment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlSelfAssessment}${id}/`);
  }
}
