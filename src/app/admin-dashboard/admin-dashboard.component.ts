import { Component, OnInit } from '@angular/core';
import { AppointmentCrudService } from '../services/appointment-crud.service';
import { UserCrudService } from '../services/user-crud.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  dentists = [{ name: 'Dr. Lynne L. Buensalida' }];
  staffs = [{ name: 'Mr. Lorem A. Ipsum' }];
  businessHours = {
    mondayToFriday: '9am - 4pm',
    saturday: '9am - 1pm',
    sunday: 'Closed',
  };
  holidaysAndEvents = [{ date: '', event: '' }];
  registeredUsers = 100;
  patients = { monthly: 100, weekly: 10, daily: 5 };
  appointments = {
    monthly: 100,
    weekly: 10,
    daily: 5,
  };
  appointmentsToday : any = []
  constructor(
    private _APPOINTMENT: AppointmentCrudService,
    private _USER: UserCrudService,
    private _AUTH: AuthService
  ) {}

  ngOnInit(): void {}

}
