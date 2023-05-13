import { Component, OnInit } from '@angular/core';
import { ServiceCrudService } from '../services/service-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnInit {
  services: any[] = [];
  constructor(
    private _SERVICECRUD: ServiceCrudService,
    public _ROUTE: Router
  ) {}
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
  OnMakeAppointment() {
    this._ROUTE.navigate(['/appointments']);
  }
  ngOnInit(): void {
    this.getServices();
  }
}
