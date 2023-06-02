import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class UserCrudService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/getusers`, { headers });
  }

  getUserById(userId: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers }).pipe(
      tap(
        (response: any) => console.log('getUserById response:', response),
        (error: any) => console.error('getUserById error:', error)
      )
    );
  }


  createUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  updateUser(userId: string, user: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, user, { headers });
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteuser/${userId}`, { responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting user:', error);
          // Handle error, show an error message, etc.
          return throwError(error);
        })
      );
  }

}
