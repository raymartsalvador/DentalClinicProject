import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportCrudService {

  private apiBaseUrl = 'http://localhost:3000/api'; // Replace with your actual API base URL

  constructor(private http: HttpClient) { }

  getReport(reportId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/reports/${reportId}`);
  }

  updateReport(reportId: string, updatedReport: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/reports/${reportId}`, updatedReport);
  }

  createReport(reportData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/reports`, reportData);
  }

  deleteReport(reportId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/reports/${reportId}`);
  }

}
