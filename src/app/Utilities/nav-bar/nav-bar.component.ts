import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  showDropdown = false;
  mobile = false;
  mobilenav() {
    this.mobile = !this.mobile;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
