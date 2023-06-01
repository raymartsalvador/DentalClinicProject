import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientInformationCrudService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPatientInformation(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient-information/${userId}`);
  }

  updatePatientInformation(userId: string, patientInfo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/patient-information/${userId}`, patientInfo);
  }

  createPatientInformation(patientInfo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/patient-information`, patientInfo);
  }

  deletePatientInformation(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/patient-information/${userId}`);
  }
}
