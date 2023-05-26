import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  token: any;
  showDropdown = false;
  i = 1;
  toggleSignUp: boolean = false;
  isLoggedIn: boolean = false;
  hamburgerMenuOpen = false;
  currentUser: string = '';
  constructor(public _authService: AuthService, private _router: Router) {
    this.token = localStorage.getItem('token');
    this.onCheckingUser();
  }

  ngOnInit(): void {
    this.onCheckingUser();
    this.getCurrentUser();
    this.token = localStorage.getItem('token');

    // Listen to route changes
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onCheckingUser();
      }
    });
  }

  @Input() routes: any = [{ name: '', path: '' }];
  @Input() signIn: any = [{ name: '', path: '' }];
  @Input() signUp: any = [{ name: '', path: '' }];
  @Input() dashBoard: any = { name: '', path: '' };
  @Input() adminAccessPatient: any = { name: '', path: '' };
  @Input() adminAccessSchedule: any = { name: '', path: '' };
  @Input() adminAccessService: any = { name: '', path: '' };
  @Input() adminAccessUser: any = { name: '', path: '' };
  @Input() userAccessAppointments: any = { name: '', path: '' };

  executeLogout(): void {
    this._authService.logoutUser();
    localStorage.removeItem('token');
  }
  getCurrentUser(): string {
    if (this.isLoggedIn && this.currentUser) {
      return this.currentUser;
    }
    return 'User';
  }

  onCheckingUser() {
    this.isLoggedIn = !!this.token;
    if (this.isLoggedIn) {
      const payload: any = jwt_decode(this.token);
      this.currentUser = payload.firstName + ' ' + payload.lastName;
    }
  }

  onToggleSignUp() {
    this.i++;
    let mod = this.i % 2;
    if (mod == 0) {
      this.toggleSignUp = true;
    } else {
      this.toggleSignUp = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.hamburgerMenuOpen = !this.hamburgerMenuOpen;
  }
}
