import { Component, OnInit } from '@angular/core';
import { UserCrudService } from '../services/user-crud.service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: any;
  password: any;
  phone: any;
  firstName: any;
  middleName: any;
  lastName:  any;
  suffix: any;
  age:  any;
  sex:  any;
  address:  any;
  comorbidity:  any;
  name:any;
  isEditing: boolean | undefined;

  // ...
  
  constructor(
    private userCrudService: UserCrudService,
    private authService: AuthService
  ) {}

// ...
ngOnInit(): void {
  const token = this.authService.getToken();
  if (token) {
    const decodedToken: any = jwt_decode(token);
    const userId = decodedToken.subject; // Access the userId from the decoded token

    if (userId) {
      this.userCrudService.getUserById(userId, token).subscribe(
        (user: any) => {
          // Update user data
          this.email = user.email;
          this.age = user.age;
          this.address = user.address;
          this.comorbidity = user.comorbidity;
          this.name = `${user.firstName} ${user.lastName} ${user.suffix}`;
          this.sex = user.sex;
          this.address = user.address;
          this.phone = user.phone;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.suffix = user.suffix;

          console.log(
            this.email,
            this.age,
            this.address,
            this.comorbidity,
            this.name
          );
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.log('User not found');
    }
  } else {
    console.log('Token not found');
  }
}


saveChanges() {
  const token = this.authService.getToken();
  if (token) {
    const decodedToken: any = jwt_decode(token);
    const userId = decodedToken.subject;

    if (userId) {
      const updatedUser: any = {}; // Initialize an empty object for the updated user data

      // Check if fields have values before including them in the updatedUser object
      if (this.phone) {
        updatedUser.phone = this.phone;
      }
      if (this.age) {
        updatedUser.age = this.age;
      }
      if (this.email) {
        updatedUser.email = this.email;
      }
      if (this.address) {
        updatedUser.address = this.address;
      }
      if (this.comorbidity) {
        updatedUser.comorbidity = this.comorbidity;
      }
      if (this.firstName) {
        updatedUser.firstName = this.firstName;
      }
      if (this.lastName) {
        updatedUser.lastName = this.lastName;
      }
      if (this.suffix) {
        updatedUser.suffix = this.suffix;
      }
      if (this.sex) {
        updatedUser.sex = this.sex;
      }
      if (this.password) {
        updatedUser.password = this.password;
      }

      this.userCrudService.updateUser(userId, updatedUser, token).subscribe(
        (response: any) => {
          console.log('User updated successfully:', response);
          this.isEditing = false; // Exit the editing mode after successful update
          window.location.reload();
        },
        (error: any) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.log('User ID not found in token');
    }
  } else {
    console.log('Token not found');
  }
}

// ...

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }
  // ...
}
