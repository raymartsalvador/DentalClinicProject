import { Component, OnInit } from '@angular/core';
import { ServiceCrudService } from 'src/app/services/service-crud.service';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.scss'],
})
export class ManageServicesComponent implements OnInit {
  services: any[] = [];
  showAddServiceBlock: boolean = false;
  newService: any = {};
  constructor(private serviceCrudService: ServiceCrudService) {}

  ngOnInit(): void {
    this.getServices();
  }
  //deleting a service
  deleteService(_id: string): void {
    this.serviceCrudService.deleteService(_id).subscribe(
      (response) => {
        // Service deleted successfully
        console.log('Service deleted:', response);
        // Refresh the list of services
        this.getServices();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //adding service
  showAddService() {
    this.showAddServiceBlock = true;
  }
  hideAddService() {
    this.showAddServiceBlock = false;
  }
  addService(): void {
    console.log('Adding service:', this.newService);
    this.serviceCrudService.createService(this.newService).subscribe(
      (response) => {
        // Service created successfully

        this.showAddServiceBlock = false;
        this.getServices();
        console.log('New service added:', response);
        // ...
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //fetch all service
  getServices(): void {
    this.serviceCrudService.getServices().subscribe(
      (response) => {
        this.services = response;
        console.log('Services:', this.services);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
