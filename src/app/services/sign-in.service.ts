import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  forgotPassword = new Subject<boolean>();
  forgotPassowrdValue$: Observable<boolean> = this.forgotPassword.asObservable();
  signIn = new Subject<boolean>();
  signInValue$: Observable<boolean> = this.signIn.asObservable();
  signUp = new Subject<boolean>();
  signUpValue$: Observable<boolean> = this.signUp.asObservable();

  constructor() {
    this.forgotPassword.next(false);
    this.signIn.next(true);
    this.signUp.next(false);
  }

  setSignUp(value: boolean) {
    this.forgotPassword.next(value);
  }
  setSignIn(value: boolean) {
    this.signIn.next(value);
  }
  setForgotPassword(value: boolean) {
    this.signUp.next(value);
  }
}
