import { Component, OnInit } from '@angular/core';
import { AppointmentCrudService } from '../services/appointment-crud.service';
import { UserCrudService } from '../services/user-crud.service';
import { AuthService } from '../services/auth.service';
import { SettingsCrudService } from '../services/setting_crud.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  date: Date = new Date();
  businessHours: any;
  dentists :any;
  staffs = [{ name: 'Mr. Lorem A. Ipsum' }];
  holidaysAndEvents = [{ date: '', event: '' }];
  registeredUsers :any;
  usersRegisteredToday:any;
  usersRegisteredThisWeek :any;
  usersRegisteredThisMonth :any;
  approvedAppointmentsDay: number = 0;
  approvedAppointmentsWeek: number = 0;
  approvedAppointmentsMonth: number = 0;

  appointmentsToday : any = []
  constructor(
    private _APPOINTMENT: AppointmentCrudService,
    private _USER: UserCrudService,
    private _AUTH: AuthService,
    private _SETTING: SettingsCrudService
  ) {}

  ngOnInit(): void {
    this.getBusinessHours();
    this.getDentists();
    this.getUsersCount();
    this.getUsersRegisteredToday();
    this.getUsersRegisteredThisWeek();
    this.getUsersRegisteredThisMonth();
    this.getAppointmentsCount();
  }

  getAppointmentsCount(): void {
    const currentDate = new Date();
    const currentWeekStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    this._APPOINTMENT.getAppointments().subscribe(
      (appointments) => {
        this.appointmentsToday = appointments.filter(
          (appointment: any) =>
            appointment.isApproved &&
            new Date(appointment.start).toDateString() ===
              currentDate.toDateString()
        );

        this.approvedAppointmentsDay = this.appointmentsToday.length;

        this.approvedAppointmentsWeek = appointments.filter(
          (appointment: any) =>
            appointment.isApproved &&
            new Date(appointment.start) >= currentWeekStart &&
            new Date(appointment.start) < new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
        ).length;


        this.approvedAppointmentsMonth = appointments.filter(
          (appointment: any) =>
            appointment.isApproved &&
            new Date(appointment.start) >= currentMonthStart &&
            new Date(appointment.start) < new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0) // Compare with end of current month
        ).length;

      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  getUsersRegisteredToday(): void {
    this._USER.getUsersRegisteredWithinTimeFrame('day').subscribe(
      (count: number) => {
        this.usersRegisteredToday = count;
      },
      (error: any) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  getUsersRegisteredThisWeek(): void {
    this._USER.getUsersRegisteredWithinTimeFrame('week').subscribe(
      (count: number) => {
        this.usersRegisteredThisWeek = count;
      },
      (error: any) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  getUsersRegisteredThisMonth(): void {
    this._USER.getUsersRegisteredWithinTimeFrame('month').subscribe(
      (count: number) => {
        this.usersRegisteredThisMonth = count;
      },
      (error: any) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  getUsersCount(): void {
    const token = 'your_token'; // Replace with the actual token
    this._USER.getUsersCount(token).subscribe(
      (count: number) => {
        this.registeredUsers = count;
      },
      (error: any) => {
        console.error('Error fetching users count:', error);
      }
    );
  }
  getBusinessHours(): void {
    this._SETTING.getSettings().subscribe(
      (response) => {
        console.log('Response:', response);
        try {
          if (typeof response.businessHours === 'string') {
            this.businessHours = JSON.parse(response.businessHours);
          } else {
            this.businessHours = response.businessHours;
          }
        } catch (error) {
          console.error('Error parsing business hours:', error);
          this.businessHours = null; // Set a default value or handle the error as needed
        }
      },
      (error) => {
        console.error('Error retrieving business hours:', error);
      }
    );
  }
  getDentists(): void {
    this._SETTING.getSettings().subscribe(
      (response) => {
        console.log('Response:', response);
        try {
          if (response.dentalClinic && response.dentalClinic.dentists) {
            this.dentists = response.dentalClinic.dentists;
          } else {
            this.dentists = [];
          }
        } catch (error) {
          console.error('Error parsing dentists:', error);
          this.dentists = [];
        }
      },
      (error) => {
        console.error('Error fetching dentists:', error);
        this.dentists = [];
      }
    );
  }


}
