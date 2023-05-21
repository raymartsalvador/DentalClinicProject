import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private datePipe: DatePipe
  ) {}

  registerUserData = {
    email: '',
    password: '',
    repeatPassword: '',
    phone:'',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dateAdded: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    age: null,
    gender: ''
  };

  OnSignIn() {
    this._router.navigate(['/signIn']);
  }

  registerUser() {
    if (this.registerUserData.password !== this.registerUserData.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    this._auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        // Redirect to home page if login is successful
        this._router.navigate(['/home']);
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}
}
