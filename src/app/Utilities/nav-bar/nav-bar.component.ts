import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  showDropdown = false;
  mobile = false;

  @Input() routerLink:any = {
    home:'',
    contact:'',
    aboutUs:'',
    services:'',
    signIn:'',
    signUp: ''
  };


  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
