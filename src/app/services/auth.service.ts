import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  private _registerUrl = 'http://localhost:3000/api/users/register';
  private _loginUrl = 'http://localhost:3000/api/users/login';

  constructor(private http: HttpClient, private _router: Router) {}

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const payload: { role?: string[] } = jwt_decode(token);
      if (payload.role && payload.role.includes('admin')) {
        return true; // User has the admin role
      }
    }
    return false;
  }



  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
