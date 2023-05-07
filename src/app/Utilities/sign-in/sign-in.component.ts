import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginUserData = { email: '', password: '' };
  constructor(private _auth: AuthService) {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  onPressingForgotPassword() {}
  onPressingSignUp() {}

  ngOnInit(): void {}
}
