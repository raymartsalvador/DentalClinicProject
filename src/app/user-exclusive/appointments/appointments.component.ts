import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  selectedService: string | undefined;
  selectedDate: Date | undefined;
  selectedHours: number | undefined;

  submitForm() {
    // Handle form submission logic here
    console.log('Selected Service:', this.selectedService);
    console.log('Selected Date:', this.selectedDate);
    console.log('Selected Hours:', this.selectedHours);
  }
}
