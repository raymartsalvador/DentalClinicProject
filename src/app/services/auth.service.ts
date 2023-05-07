import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private _http: HttpClient) {}

  registerUser(user: User): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(this._registerUrl, user);
  }

  loginUser(user: User): Observable<AuthResponse> {
     return this._http.post<AuthResponse>(this._loginUrl, user);
  }

  isLoggedIn(): boolean {
    // Check if user is logged in by checking the presence of token in local storage
    const token = localStorage.getItem('token');
    return !!token;
  }

}
