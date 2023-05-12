import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserCrudService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/getusers`, { headers });
  }

  getUserById(userId: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  createUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  updateUser(userId: string, user: any) {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }
}
