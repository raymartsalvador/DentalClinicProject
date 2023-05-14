import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  viewDate: Date;
  events: CalendarEvent[];
  currentView: 'month' | 'week' | 'day';

  constructor() {
    this.viewDate = new Date();
    this.currentView = 'month';

    // Define example events
    this.events = [
      // Your existing events here
    ];
  }

  changeView(view: 'month' | 'week' | 'day', event?: any) {
    this.currentView = view;
    if (event && event.day) {
      this.viewDate = event.day.date;
    }
  }



}
