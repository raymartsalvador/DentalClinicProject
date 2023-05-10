import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn() && this.authService.isAdmin()) {
      return true; // User is logged in and has the admin role
    } else {
      this.router.navigate(['/dashBoard']);
      return false;
    }
  }
}
