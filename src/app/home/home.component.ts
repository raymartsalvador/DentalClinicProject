import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCrudService } from '../services/service-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  services: any[] = [];
  constructor(
    private _SERVICECRUD: ServiceCrudService,
    public _ROUTER: Router
  ) {}
  ngOnInit(): void {
    this.getServices()
  }
  getServices(): void {
    this._SERVICECRUD.getServices().subscribe(
      (response) => {
        this.services = response;
        console.log('Services:', this.services);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  OnMakeAnAppointment() {
    this._ROUTER.navigate(['/appointments']);
  }
  OnOurServices() {
    this._ROUTER.navigate(['/services']);
  }
}
