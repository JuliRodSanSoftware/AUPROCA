import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrlRols = `${Constants.API}/Rol/`;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<{ results: Role[] }>(this.apiUrlRols)
      .pipe(
        map(response => response.results)
      );
  }
}
