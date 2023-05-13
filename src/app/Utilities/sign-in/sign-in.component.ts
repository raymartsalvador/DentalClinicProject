import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginUserData = { email: '', password: '' };
  rememberMeChecked: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      // If found, populate the login form with the remembered user credentials
      this.loginUserData = JSON.parse(rememberedUser);
      this.rememberMeChecked = true;
    }
  }

  storeUserCredentials(): void {
    if (this.rememberMeChecked) {
      // If Remember Me is checked, store the user credentials in local storage
      localStorage.setItem('rememberedUser', JSON.stringify(this.loginUserData));
    } else {
      // If Remember Me is not checked, remove any previously stored user credentials
      localStorage.removeItem('rememberedUser');
    }
  }

  loginUser(): void {
    this.storeUserCredentials();

    this._auth.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        // Redirect to home page if login is successful
        this._router.navigate(['/dashBoard']);
      },
      (err) => console.log(err)
    );
  }

  onPressingForgotPassword() {}

  onPressingSignUp() {
    this._router.navigate(['/signUp']);
  }

  toggleRememberMe(): void {
    this.rememberMeChecked = !this.rememberMeChecked;
  }
}
