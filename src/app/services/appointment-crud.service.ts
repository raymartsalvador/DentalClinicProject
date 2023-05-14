import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentCrudService {

  private apiBaseUrl = 'http://localhost:3000/api'; // Replace with your actual API base URL

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/appointments`);
  }

  updateAppointment(appointmentId: string, updatedAppointment: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/appointments/${appointmentId}`, updatedAppointment);
  }

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/appointments`, appointmentData);
  }

  deleteAppointment(appointmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/appointments/${appointmentId}`);
  }
}
