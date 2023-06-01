import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  contactNumber = '1234567890';
  age = 25;
  email = 'johnDoe@gmail.com';
  address = '123, abc street, xyz city, 12345';
  comorbidity = 'None';
  name= 'John Toughness';

  constructor() { }
}
