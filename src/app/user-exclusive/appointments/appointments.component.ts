import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentCrudService } from 'src/app/services/appointment-crud.service';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { ServiceCrudService } from 'src/app/services/service-crud.service';
import { CalendarComponent } from 'src/app/Utilities/calendar/calendar.component';
import { SettingsCrudService } from 'src/app/services/setting_crud.service';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  selectedServiceCount: number = 0;
  selectedService: string[] = [];
  showForm: boolean = false;
  selectedDate: Date = new Date();
  selectedTime: string = '';
  services: any[] = [];
  isApproved: boolean = false;
  showMessageBlock: boolean = false;
  message: string = '';
  messageBlockType: string = '';
  myAppointments: any[] = [];
  selectedServices: string[] = [];
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
  onShowForm() {
    if (this.selectedServiceCount > 0) {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
    console.log(this.selectedServiceCount);

    console.log(this.showForm);
  }
  getCountArray(): number[] {
    return Array.from(
      { length: this.selectedServiceCount },
      (_, index) => index + 1
    );
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
    if (
      this.selectedServices.length === 0 ||
      !this.selectedDate ||
      !this.selectedTime
    ) {
      // Disable submit button if any required field is incomplete
      return;
    }

    const currentDate = new Date();
    const selectedDateTime = new Date(this.selectedDate);
    const [hours, minutes] = this.selectedTime.split(':');
    selectedDateTime.setHours(Number(hours));
    selectedDateTime.setMinutes(Number(minutes));

    if (selectedDateTime < currentDate) {
      this.showMessageBlock = true;
      this.message = 'Please select a future date and time.';
      this.messageBlockType = 'error';
      return;
    }

    const isWithinBusinessHours = this.isWithinBusinessHours(selectedDateTime);

    if (!isWithinBusinessHours) {
      this.showMessageBlock = true;
      this.message = 'Selected time is outside of business hours.';
      this.messageBlockType = 'error';
      return;
    }

    const startDateTime = selectedDateTime;
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
    console.log('Appointment start time:', startDateTime);

    const selectedService = this.services.find(
      (service) => service.title === this.selectedServices[0]
    );

    if (!selectedService) {
      console.error('Selected service not found');
      return;
    }

    const selectedServices = this.selectedServices.map((service: string) =>
      service.trim()
    );
    const appointment: any = {
      title: selectedServices, // Store the array of selected services
      start: startDateTime,
      end: endDateTime,
      isApproved: this.isApproved,
      color: {
        primary: selectedService.color.primary,
        secondary: selectedService.color.secondary,
      },
    };

    // Retrieve the user's token
    const token = this.authService.getToken();

    if (token) {
      // Decode the token to get the user's ID and name
      const payload: {
        subject?: string;
        firstName?: string;
        lastName?: string;
      } = jwt_decode(token);

      if (payload.subject && payload.firstName && payload.lastName) {
        // Associate the user's ID and name with the appointment
        appointment.user = payload.subject;
        appointment.patientName = `${payload.firstName} ${payload.lastName}`;

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
                    this.showMessageBlock = true;
                    this.messageBlockType = 'success';
                    this.message =
                      'You successfully requested an appointment. Please wait for confirmation through your email or contact number.';
                    this.calendarComponent.refreshCalendar();
                  },
                  (error: any) => {
                    console.error('Error creating appointment:', error);
                    // Handle error case if necessary
                    this.showMessageBlock = true;
                    this.message = 'Error creating appointment.';
                    this.messageBlockType = 'error';
                  }
                );
              } else {
                // Schedule is unavailable
                this.showMessageBlock = true;
                this.message = 'Time slot has been taken';
                this.messageBlockType = 'error';
              }
            },
            (error: any) => {
              console.error('Error checking availability:', error);
              // Handle error case if necessary
              this.showMessageBlock = true;
              this.message = 'Error checking availability.';
              this.messageBlockType = 'error';
            }
          );
      } else {
        console.error('User ID, first name, or last name not found in token');
      }
    } else {
      console.error('Token not found');
    }
  }

  isWithinBusinessHours(date: Date): boolean {
    const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, and so on
    const [hours, minutes] = this.selectedTime.split(':');
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(Number(hours));
    selectedDateTime.setMinutes(Number(minutes));

    if (dayOfWeek === 0) {
      // Sunday, the clinic is closed
      return false;
    } else if (dayOfWeek === 6) {
      // Saturday, check if within 9:00 am - 1:00 pm
      const startDateTime = new Date(date);
      startDateTime.setHours(9);
      startDateTime.setMinutes(0);
      const endDateTime = new Date(date);
      endDateTime.setHours(13);
      endDateTime.setMinutes(0);
      return (
        selectedDateTime >= startDateTime && selectedDateTime <= endDateTime
      );
    } else {
      // Monday to Friday, check if within 9:00 am - 4:00 pm
      const startDateTime = new Date(date);
      startDateTime.setHours(9);
      startDateTime.setMinutes(0);
      const endDateTime = new Date(date);
      endDateTime.setHours(16);
      endDateTime.setMinutes(0);
      return (
        selectedDateTime >= startDateTime && selectedDateTime <= endDateTime
      );
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
