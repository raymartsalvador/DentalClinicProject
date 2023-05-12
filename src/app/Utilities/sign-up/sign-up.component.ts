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
  OnSignIn() {
    this._router.navigate(['/signIn']);
  }
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private datePipe: DatePipe
  ) {}
  registerUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateAdded: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
  };
  registerUser() {
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
