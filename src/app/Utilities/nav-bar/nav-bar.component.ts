import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  showDropdown = false;
  mobile = false;

  @Input() routerLink:string[] = [];

  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
