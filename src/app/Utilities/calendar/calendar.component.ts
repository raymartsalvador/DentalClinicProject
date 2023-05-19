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
  businessHours: any;

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
      (data: any) => {
        this.events = data.map((appointment: any) => ({
          title: appointment.title,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
          color: {
            primary: appointment.color.primary,
            secondary: appointment.color.secondary,
          },
        }));

        this.businessHours = data.businessHours; // Store the business hours data
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

  prev() {
    if (this.currentView === 'month') {
      this.prevMonth();
    } else if (this.currentView === 'week') {
      this.prevWeek();
    } else if (this.currentView === 'day') {
      this.prevDay();
    }
  }

  next() {
    if (this.currentView === 'month') {
      this.nextMonth();
    } else if (this.currentView === 'week') {
      this.nextWeek();
    } else if (this.currentView === 'day') {
      this.nextDay();
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
      (prevMonthIndex >= currentMonth &&
        prevYear === currentYearFromCurrentDate) ||
      prevYear < currentYearFromCurrentDate
    ) {
      const selectedDate = new Date(prevYear, prevMonthIndex, 1);
      this.viewDate = selectedDate;
      console.log(
        'Selected month:',
        this.getMonthName(prevMonthIndex),
        'year:',
        prevYear
      );
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
      (currentYear === currentYearFromCurrentDate &&
        nextMonthIndex > currentMonth) ||
      currentYear < currentYearFromCurrentDate
    ) {
      const selectedDate = new Date(currentYear, nextMonthIndex, 1);
      this.viewDate = selectedDate;
      console.log(
        'Selected month:',
        this.getMonthName(nextMonthIndex),
        'year:',
        currentYear
      );
    }
  }

  prevWeek() {
    const selectedDate = new Date(
      this.viewDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    this.viewDate = selectedDate;
    console.log('Selected week:', selectedDate);
  }

  nextWeek() {
    const selectedDate = new Date(
      this.viewDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    this.viewDate = selectedDate;
    console.log('Selected week:', selectedDate);
  }

  prevDay() {
    const selectedDate = new Date(
      this.viewDate.getTime() - 24 * 60 * 60 * 1000
    );
    this.viewDate = selectedDate;
    console.log('Selected day:', selectedDate);
  }

  nextDay() {
    const selectedDate = new Date(
      this.viewDate.getTime() + 24 * 60 * 60 * 1000
    );
    this.viewDate = selectedDate;
    console.log('Selected day:', selectedDate);
  }

  getCurrentDate(): string {
    const monthIndex = this.viewDate.getMonth();
    const year = this.viewDate.getFullYear();
    const monthName = this.getMonthName(monthIndex);

    if (this.currentView === 'month') {
      return `${monthName} ${year}`;
    } else if (this.currentView === 'week') {
      const startOfWeek = this.getStartOfWeek(this.viewDate);
      const endOfWeek = this.getEndOfWeek(this.viewDate);
      const startMonthIndex = startOfWeek.getMonth();
      const startMonthName = this.getMonthName(startMonthIndex);
      const endMonthIndex = endOfWeek.getMonth();
      const endMonthName = this.getMonthName(endMonthIndex);
      const startDate = startOfWeek.getDate();
      const endDate = endOfWeek.getDate();

      return `${startMonthName} ${startDate} - ${endMonthName} ${endDate}, ${year}`;
    } else if (this.currentView === 'day') {
      const day = this.viewDate.getDate();
      return `${monthName} ${day}, ${year}`;
    }

    return '';
  }

  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay();
    const difference = dayOfWeek >= 1 ? dayOfWeek - 1 : 6;
    const startOfWeek = new Date(
      date.getTime() - difference * 24 * 60 * 60 * 1000
    );
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  getEndOfWeek(date: Date): Date {
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
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
