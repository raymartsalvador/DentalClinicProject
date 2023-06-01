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
  showPopup = false;
  @Input() routes: any = [{ name: '', path: '', fa: '' }];
  @Input() signIn: any = [{ name: '', path: '', fa: '' }];
  @Input() signUp: any = [{ name: '', path: '', fa: '' }];
  @Input() dashBoard: any = { name: '', path: '', fa: '' };
  @Input() adminAccessPatient: any = { name: '', path: '', fa: '' };
  @Input() adminAccessSchedule: any = { name: '', path: '', fa: '' };
  @Input() adminAccessService: any = { name: '', path: '', fa: '' };
  @Input() adminAccessUser: any = { name: '', path: '', fa: '' };
  @Input() userAccessAppointments: any = { name: '', path: '', fa: '' };
  @Input() profile: any = {  path: ''}
  constructor(public _authService: AuthService, private _router: Router) {
    this.token = localStorage.getItem('token');
    this.onCheckingUser();
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.token = localStorage.getItem('token');
    // Listen to route changes
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onCheckingUser();
      }
    });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
    console.log(this.showPopup);

  }

  executeLogout(): void {
    this._authService.logoutUser();
    localStorage.removeItem('token');
    this.currentUser = ''; // Clear the currentUser immediately after logging out
    window.location.reload(); // Reload the current route to refresh the navbar
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
    } else {
      this.currentUser = ''; // Reset the currentUser if not logged in
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
