import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LCL Dental Clinic';
  routes: any = [
    { name: 'Home', path: 'home' },
    { name: 'Contact', path: 'contact' },
    { name: 'About Us', path: 'aboutUs' },
    { name: 'Services', path: 'services' },
  ];

  signIn: any = { name: 'Sign In', path: 'signIn' };
  dashBoard: any = { name: 'Dashboard', path: 'dashBoard' };
  adminAccessUser: any = { name: 'Patients', path: 'manage-users' };
  adminAccessPatient: any = { name: 'Patient', path: 'manage-patients' };
  adminAccessSchedule: any = { name: 'Appointments', path: 'manage-schedule' };
  adminAccessService: any = { name: 'Services', path: 'manage-services' };
  userAccessAppointments: any = { name: 'Appointments', path: 'appointments' };
  signUp: any = {
    name: 'Sign Up',
    path: 'signUp',
  };

}

