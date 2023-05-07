import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LCC Dental Clinic';
  routerLink = ['home', 'contact', 'aboutUs', 'services', 'signIn', 'signUp'];
}
