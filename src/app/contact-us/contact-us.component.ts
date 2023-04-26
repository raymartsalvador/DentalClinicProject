import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  subject: string = '';
  onSubmit() {
    alert('Submitted form successfully, ' + name);
  }
}
