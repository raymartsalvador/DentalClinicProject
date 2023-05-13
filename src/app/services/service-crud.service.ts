import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceCrudService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  updateService(serviceId: string, service: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/services/${serviceId}`, service);
  }

  createService(service: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, service);
  }
  deleteService(serviceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/services/${serviceId}`);
  }
}
