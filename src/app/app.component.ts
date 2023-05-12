import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LCC Dental Clinic';
  routes: any = [
    { name: 'Home', path: 'home' },
    { name: 'Contact', path: 'contact' },
    { name: 'About Us', path: 'aboutUs' },
    { name: 'Services', path: 'services' },
  ];

  signIn: any = { name: 'Sign In', path: 'signIn' };
  dashBoard: any = { name: 'Dashboard', path: 'dashBoard' };
  signUp: any = {
    name: 'Sign Up',
    path: 'signUp',
  };
}
