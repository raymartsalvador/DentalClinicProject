import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  firstName = ''
  lastName = ''
  registerUserData = { email: '', password: '', name:this.firstName+' '+this.lastName, };

  constructor(private _auth: AuthService, private _router: Router) {}

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem('token', res.token)
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}
}
