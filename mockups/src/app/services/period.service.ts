import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Period } from '../models/period';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private apiUrlPeriods = `${Constants.API}/Periodo/`;

  constructor(private http: HttpClient) { }

  getPeriods(): Observable<Period[]> {
    return this.http.get<{ results: Period[] }>(this.apiUrlPeriods)
      .pipe(
        map(response => response.results)
      );
  }

}
