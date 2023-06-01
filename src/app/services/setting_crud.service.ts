import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsCrudService {
  private apiUrl = 'http://localhost:3000/api/settings';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  updateSettings(settingsId: string, settings: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${settingsId}`, settings);
  }

  createSettings(settings: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, settings);
  }

  deleteSettings(settingsId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${settingsId}`);
  }
}
