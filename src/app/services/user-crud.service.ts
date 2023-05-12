import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserCrud {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: any) {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(userId: string, user: any) {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }
}
