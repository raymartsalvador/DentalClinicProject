import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentCrudService } from 'src/app/services/appointment-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { ServiceCrudService } from 'src/app/services/service-crud.service';
import { CalendarComponent } from 'src/app/Utilities/calendar/calendar.component';
import { SettingsCrudService } from 'src/app/services/setting_crud.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  selectedService: string | undefined;
  selectedDate: Date = new Date();
  selectedTime: string = '';
  services: any[] = [];
  showMessageBlock: boolean = false;
  message: string = '';
  messageBlockType: string = '';
  myAppointments: any[] = [];

  @ViewChild(CalendarComponent)
  private calendarComponent!: CalendarComponent;
  businessHours: any;

  constructor(
    private _APPOINTMENT: AppointmentCrudService,
    private _SERVICECRUD: ServiceCrudService,
    private authService: AuthService,
    private _SETTING: SettingsCrudService
  ) {}

  ngOnInit() {
    this.getServices();
    this.getMyAppointments();
    this.getBusinessHours();
  }
  getBusinessHours(): void {
    this._SETTING.getSettings().subscribe(
      (response) => {
        console.log('Response:', response);
        try {
          if (typeof response.businessHours === 'string') {
            this.businessHours = JSON.parse(response.businessHours);
          } else {
            this.businessHours = response.businessHours;
          }
        } catch (error) {
          console.error('Error parsing business hours:', error);
          this.businessHours = null; // Set a default value or handle the error as needed
        }
      },
      (error) => {
        console.error('Error retrieving business hours:', error);
      }
    );
  }

  getStartTime(date: Date): string {
    const startTime = new Date(date);
    startTime.setHours(8); // Set the desired start time
    startTime.setMinutes(0);
    return startTime.toTimeString().slice(0, 5); // Extract the time portion as "HH:mm"
  }

  getEndTime(date: Date): string {
    const endTime = new Date(date);
    endTime.setHours(17); // Set the desired end time
    endTime.setMinutes(0);
    return endTime.toTimeString().slice(0, 5); // Extract the time portion as "HH:mm"
  }


  private getDayFromDate(date: string): string {
    const dayIndex = new Date(date).getDay();
    return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayIndex];
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
      this.messageBlockType = 'error';
      return;
    }

    const startDateTime = selectedDateTime;
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours to the selected start time

    console.log('Appointment start time:', startDateTime);

    // Find the selected service in the services array
    const selectedService = this.services.find(
      (service) => service.title === this.selectedService
    );

    if (!selectedService) {
      console.error('Selected service not found');
      return;
    }

    const appointment: any = {
      title: this.selectedService,
      start: startDateTime,
      end: endDateTime,
      color: {
        primary: selectedService.color.primary, // Set the primary color from the selected service
        secondary: selectedService.color.secondary, // Set the secondary color from the selected service
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
        this._APPOINTMENT
          .checkAvailability(appointment.start, appointment.end)
          .subscribe(
            (response: boolean) => {
              if (response) {
                // Schedule is available
                this._APPOINTMENT.createAppointment(appointment).subscribe(
                  (response: any) => {
                    console.log('Appointment created:', response);
                    // Perform any additional actions after successful creation
                    this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
                    this.messageBlockType = 'success';
                    this.message =
                      ' You successfully request an appointment please wait for Confirmation thru your Email or Contact number';
                    this.calendarComponent.refreshCalendar(); // Call the refreshCalendar method in the CalendarComponent
                  },
                  (error: any) => {
                    console.error('Error creating appointment:', error);
                    // Handle error case if necessary
                    this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
                    this.message = 'Error creating appointment.';
                    this.messageBlockType = 'error';
                  }
                );
              } else {
                // Schedule is unavailable
                this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
                this.message = 'Time slot has been taken';
                this.messageBlockType = 'error';
              }
            },
            (error: any) => {
              console.error('Error checking availability:', error);
              // Handle error case if necessary
              this.showMessageBlock = true; // Set showMessageBlock to true to display the message block
              this.message = 'Error checking availability.';
              this.messageBlockType = 'error';
            }
          );
      } else {
        console.error('User ID not found in token');
      }
    } else {
      console.error('Token not found');
    }
  }

  getMyAppointments(): void {
    // Retrieve the user's token
    const token = this.authService.getToken();

    if (token) {
      // Decode the token to get the user's ID
      const payload: { subject?: string } = jwt_decode(token);

      if (payload.subject) {
        // Retrieve the appointments associated with the user's ID
        this._APPOINTMENT.getUserAppointments(payload.subject).subscribe(
          (response: any) => {
            console.log('My Appointments:', response);
            this.myAppointments = response;
          },
          (error: any) => {
            console.error('Error retrieving appointments:', error);
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

  onClose(): void {
    this.showMessageBlock = false;
  }
}
