import { Component } from '@angular/core';
import { AppointmentCrudService } from 'src/app/services/appointment-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  selectedService: string | undefined;
  selectedDate: Date = new Date();
  selectedTime: string = '';

  constructor(
    private _APPOINTMENT: AppointmentCrudService,
    private authService: AuthService
  ) {}

  submitForm(): void {
    const startDateTime = new Date(this.selectedDate);
    const [hours, minutes] = this.selectedTime.split(':');
    startDateTime.setHours(Number(hours));
    startDateTime.setMinutes(Number(minutes));
    console.log('Appointment start time:', startDateTime);

    const appointment: any = {
      title: this.selectedService,
      start: startDateTime,
      end: new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000), // Adding 2 hours to the selected start time
      color: {
        primary: '#008000', // Green color
        secondary: '#00CED1' // Blue-green color
      }
    };

    // Retrieve the user's token
    const token = this.authService.getToken();

    if (token) {
      // Decode the token to get the user's ID
      const payload: { subject?: string } = jwt_decode(token);

      if (payload.subject) {
        // Associate the user's ID with the appointment
        appointment.user = payload.subject;

        // Call the service to create the appointment
        this._APPOINTMENT.createAppointment(appointment).subscribe(
          (response: any) => {
            console.log('Appointment created:', response);
            // Perform any additional actions after successful creation
          },
          (error: any) => {
            console.error('Error creating appointment:', error);
            // Handle error case if necessary
          }
        );
      } else {
        console.error('User ID not found in token');
      }
    } else {
      console.error('Token not found');
    }
  }
}
