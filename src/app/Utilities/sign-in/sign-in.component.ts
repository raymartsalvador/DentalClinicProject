import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginUserData = { email: '', password: '' };
  constructor(private _auth: AuthService, private _router: Router) {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        // Redirect to home page if login is successful
        this._router.navigate(['/home']);
      },
      (err) => console.log(err)
    );
  }




  onPressingForgotPassword() {
    this._router.navigate(['/forgot-password'])
  }
  onPressingSignUp() {
    this._router.navigate(['/signUp'])
  }

  ngOnInit(): void {}
}
