import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../models/loginData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin = `${Constants.API}/login/`;
  private apiUrlLogout = `${Constants.API}/logout/`;
  private apiUrlIsLogged = `${Constants.API}/is_logged_in/`;
  private apiUrlRegister = `${Constants.API}/register/`;
  constructor(private http: HttpClient) { }

  login(email: any, password:any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, {
      "email": email,
      "password": password,
    });
  }


  logout(): Observable<any> {
    let refresh = localStorage.getItem('refresh-auproca');
    let token = localStorage.getItem('token-auproca');
    localStorage.removeItem('refresh-auproca');
    localStorage.removeItem('token-auproca');
    return this.http.post<any>(this.apiUrlLogout, {
      "token": token,
      "refresh": refresh
    });
  }

  isLoggedIn(token: any): Observable<any> {
    return this.http.post<any>(this.apiUrlIsLogged, {
      "token": token
    });
  }





}