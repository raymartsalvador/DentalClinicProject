import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _eventUrl = 'http://localhost:3000/api/events';
  private _specialEventUrl = 'http://localhost:3000/api/specialEvents';
  constructor(private http: HttpClient) {}

  getEvents(){
    return this.http.get<any>(this._eventUrl)
  }
  getSpecialEvents(){
    return this.http.get<any>(this._specialEventUrl)
  }
}
