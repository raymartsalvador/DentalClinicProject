import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private _http: HttpClient) {}

  registerUser(user: {}) {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user: {}) {
     return this._http.post<any>(this._loginUrl, user);
  }

}
