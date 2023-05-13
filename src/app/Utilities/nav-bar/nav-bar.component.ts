import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  showDropdown = false;
  i = 1;
  toggleSignUp: boolean = false;
  constructor(public _authService: AuthService) {}

  @Input() routes: any = [{ name: '', path: '' }];
  @Input() signIn: any = [{ name: '', path: '' }];
  @Input() signUp: any = [{ name: '', path: '' }];
  @Input() dashBoard: any = { name: '', path: '' };
  @Input() adminAccessPatient: any = { name: '', path: '' };
  @Input() adminAccessSchedule: any = { name: '', path: '' };
  @Input() adminAccessService: any = { name: '', path: '' };
  @Input() adminAccessUser: any = { name: '', path: '' };
  @Input() userAccessAppointments: any = { name: '', path: '' };

  onToggleSignUp() {
    this.i++;
    let mod = this.i % 2;
    if (mod == 0) {
      this.toggleSignUp = true;
    }else{
      this.toggleSignUp = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
