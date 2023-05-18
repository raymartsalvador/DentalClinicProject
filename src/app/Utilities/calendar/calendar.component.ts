import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { AppointmentCrudService } from 'src/app/services/appointment-crud.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  viewDate: Date;
  events: CalendarEvent[];
  currentView: 'month' | 'week' | 'day';
  availableMonths: string[];

  constructor(private appointmentService: AppointmentCrudService) {
    this.viewDate = new Date();
    this.currentView = 'month';
    this.availableMonths = this.getAvailableMonths();
    this.events = [];
  }

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (appointments: any[]) => {
        this.events = appointments.map((appointment) => ({
          title: appointment.title,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
          color: {
            primary: appointment.color.primary,
            secondary: appointment.color.secondary,
          },
        }));
      },
      (error: any) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  changeView(view: 'month' | 'week' | 'day', event?: any) {
    this.currentView = view;
    if (event && event.day) {
      this.viewDate = event.day.date;
    }
  }

  prevMonth() {
    const currentMonthIndex = this.viewDate.getMonth();
    const currentYear = this.viewDate.getFullYear();
    const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYearFromCurrentDate = currentDate.getFullYear();

    if (
      (prevMonthIndex >= currentMonth && prevYear === currentYearFromCurrentDate) ||
      prevYear < currentYearFromCurrentDate
    ) {
      const selectedDate = new Date(prevYear, prevMonthIndex, 1);
      this.viewDate = selectedDate;
      console.log('Selected month:', this.getMonthName(prevMonthIndex), 'year:', prevYear);
    }
  }

  nextMonth() {
    const currentMonthIndex = this.viewDate.getMonth();
    const currentYear = this.viewDate.getFullYear();
    const nextMonthIndex = (currentMonthIndex + 1) % 12;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYearFromCurrentDate = currentDate.getFullYear();

    if (
      (currentYear === currentYearFromCurrentDate && nextMonthIndex > currentMonth) ||
      currentYear < currentYearFromCurrentDate
    ) {
      const selectedDate = new Date(currentYear, nextMonthIndex, 1);
      this.viewDate = selectedDate;
      console.log('Selected month:', this.getMonthName(nextMonthIndex), 'year:', currentYear);
    }
  }

  getCurrentDate(): string {
    const monthIndex = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const monthName = this.getMonthName(monthIndex);

    return `${monthName}, ${year}`;
  }

  getAvailableMonths(): string[] {
    const months: string[] = [];
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    // Add the current month
    months.push(this.getMonthName(currentMonthIndex));

    // Calculate the next two months
    for (let i = 1; i <= 2; i++) {
      const nextMonthIndex = (currentMonthIndex + i) % 12;
      const nextMonthName = this.getMonthName(nextMonthIndex);
      months.push(nextMonthName);
    }

    return months;
  }

  getMonthName(monthIndex: number): string {
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthIndex];
  }
}
