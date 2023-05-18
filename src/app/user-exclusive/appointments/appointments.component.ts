import { Component, OnInit} from '@angular/core';
import { AppointmentCrudService } from 'src/app/services/appointment-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { ServiceCrudService } from 'src/app/services/service-crud.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  selectedService: string | undefined;
  selectedDate: Date = new Date();
  selectedTime: string = '';
  services: any[] = [];
  showMessageBlock: boolean = false;
  message: string = '';

  constructor(
    private _APPOINTMENT: AppointmentCrudService,
    private _SERVICECRUD: ServiceCrudService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getServices();
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

  submitForm(): void {
    if (!this.selectedService || !this.selectedDate || !this.selectedTime) {
      // Disable submit button if any required field is incomplete
      return;
    }

    const currentDate = new Date(); // Get the current date and time
    const selectedDateTime = new Date(this.selectedDate);
    const [hours, minutes] = this.selectedTime.split(':');
    selectedDateTime.setHours(Number(hours));
    selectedDateTime.setMinutes(Number(minutes));

    if (selectedDateTime < currentDate) {
      // Selected date and time are in the past
      this.showMessageBlock = true;
      this.message = 'Please select a future date and time.';
      return;
    }

    const startDateTime = selectedDateTime;
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours to the selected start time

    console.log('Appointment start time:', startDateTime);

    const appointment: any = {
      title: this.selectedService,
      start: startDateTime,
      end: endDateTime,
      color: {
        primary: '#008000', // Green color
        secondary: '#00CED1', // Blue-green color
      },
    };

    // Retrieve the user's token
    const token = this.authService.getToken();

    if (token) {
      // Decode the token to get the user's ID
      const payload: { subject?: string } = jwt_decode(token);

      if (payload.subject) {
        // Associate the user's ID with the appointment
        appointment.user = payload.subject;

        // Check if the schedule is available
        this._APPOINTMENT.checkAvailability(appointment.start, appointment.end).subscribe(
          (response: boolean) => {
            if (response) {
              // Schedule is available
              this._APPOINTMENT.createAppointment(appointment).subscribe(
                (response: any) => {
                  console.log('Appointment created:', response);
                  // Perform any additional actions after successful creation
                  this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
                  this.message = 'Appointment created successfully.';
                },
                (error: any) => {
                  console.error('Error creating appointment:', error);
                  // Handle error case if necessary
                  this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
                  this.message = 'Error creating appointment.';
                }
              );
            } else {
              // Schedule is unavailable
              this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
              this.message = 'Selected time slot is not available.';
            }
          },
          (error: any) => {
            console.error('Error checking availability:', error);
            // Handle error case if necessary
            this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
            this.message = 'Error checking availability.';
          }
        );
      } else {
        console.error('User ID not found in token');
      }
    } else {
      console.error('Token not found');
    }
  }

  onClose(): void {
    this.showMessageBlock = false;
  }
}
