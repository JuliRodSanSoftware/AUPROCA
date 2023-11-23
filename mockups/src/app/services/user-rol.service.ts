import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserRol } from '../models/user-rol';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private apiUrlUserRol = `${Constants.API}/UserRol/`;

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<UserRol[]> {
    return this.http.get<{ results: UserRol[] }>(this.apiUrlUserRol)
      .pipe(
        map(response => response.results)
      );
  }

  createUserRole(labor: UserRol): Observable<any> {
    return this.http.post<any>(this.apiUrlUserRol, labor);
  }

  getUserRoleDetail(id: string): Observable<UserRol> {
    return this.http.get<UserRol>(`${this.apiUrlUserRol}${id}/`);
  }

  updateUserRole(id: string, updatedUserRol: UserRol): Observable<UserRol> {
    return this.http.put<UserRol>(`${this.apiUrlUserRol}${id}/`, updatedUserRol);
    
  }
}
