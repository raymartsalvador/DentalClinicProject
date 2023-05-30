import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LCL Dental Clinic';
  routes: any = [
    { name: 'Home', path: 'home', fa: 'fas fa-home' },
    { name: 'Contact', path: 'contact', fa: 'fas fa-envelope' },
    { name: 'About Us', path: 'aboutUs', fa: 'fas fa-info-circle' },
    { name: 'Services', path: 'services', fa: 'fas fa-cogs' },
  ];

  signIn: any = { name: 'Sign In', path: 'signIn', fa: 'fas fa-sign-in-alt' };
  dashBoard: any = {
    name: 'Dashboard',
    path: 'dashBoard',
    fa: 'fas fa-rectangle-list',
  };
  adminAccessUser: any = {
    name: 'Patients',
    path: 'manage-users',
    fa: 'fas fa-users',
  };
  adminAccessPatient: any = {
    name: 'Patient',
    path: 'manage-patients',
    fa: 'fas fa-user',
  };
  adminAccessSchedule: any = {
    name: 'Appointments',
    path: 'manage-schedule',
    fa: 'fas fa-calendar-alt',
  };
  adminAccessService: any = {
    name: 'Services',
    path: 'manage-services',
    fa: 'fas fa-hand-holding-medical',
  };
  userAccessAppointments: any = {
    name: 'Appointments',
    path: 'appointments',
    fa: 'fas fa-calendar-check',
  };
  signUp: any = { name: 'Sign Up', path: 'signUp', fa: 'fas fa-user-plus' };
}
