  import { Component, Input, OnInit } from '@angular/core';
  import { SignInService } from 'src/app/services/sign-in.service';

  @Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
  })
  export class SignInComponent implements OnInit {
    public forgotPassword: boolean = false;
    public signUp: boolean = false;
    @Input() signIn: boolean = true;

    constructor(private signInService: SignInService) { }

    onPressingForgotPassword(){

    }
    onPressingSignUp(){

    }
    ngOnInit(): void {

    }
  }
