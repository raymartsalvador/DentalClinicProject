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
  showEditServiceBlock: boolean = false;
  selectedService: any = {};

  constructor(private serviceCrudService: ServiceCrudService) {}

  ngOnInit(): void {
    this.getServices();
  }

  // Function to edit a service
  editService(service: any): void {
    this.selectedService = { ...service };
    this.showEditServiceBlock = true;
    this.selectedService.color = this.selectedService.color || {};
  }

  // Function to update a service
  updateService(): void {
    const { _id, ...updatedService } = this.selectedService;
    this.serviceCrudService.updateService(_id, updatedService).subscribe(
      (response) => {
        // Service updated successfully
        console.log('Service updated:', response);
        // Hide the edit service block
        this.showEditServiceBlock = false;
        // Refresh the list of services
        this.getServices();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Function to delete a service
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

  // Function to add a service
  showAddService() {
    this.showAddServiceBlock = true;
  }

  // Function to hide the add service block
  hideAddService() {
    this.showAddServiceBlock = false;
  }

  // Function to create a new service
  // Function to create a new service
addService(): void {
  console.log('Adding service:', this.newService);
  this.newService.color = {
    primary: this.newService.primaryColor || '',
    secondary: this.newService.secondaryColor || ''
  };
  this.serviceCrudService.createService(this.newService).subscribe(
    (response) => {
      // Service created successfully
      console.log('New service added:', response);
      this.newService = {}; // Reset newService object
      this.showAddServiceBlock = false;
      this.getServices();
    },
    (error) => {
      console.error(error);
    }
  );
}

  // Function to fetch all services
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
