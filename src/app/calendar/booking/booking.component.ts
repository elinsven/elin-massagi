import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Booking, BookingService } from 'src/app/services/booking.service';
import { BookingForm } from '../booking-form/booking-form.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  currentDay: Date = new Date();
  booking: BookingForm;

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.currentDay.getDate();
  }

  ngOnInit(): void {}

  onBook(booking: BookingForm): void {
    this.booking = booking;
    const newBooking: Booking = {
      starttime: this.mergeDateAndTime(booking.startTime),
      endtime: this.mergeDateAndTime(booking.endTime),
      bodypart: booking.bodyPart,
    };

    this.bookingService.addBooking(newBooking).subscribe(() => {
      this.snackBar.open('Bokat', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  private mergeDateAndTime(value: any): string {
    const date = this.booking.date;
    const time = value;
    const timeHour = time.split(':')[0];
    const timeMinute = time.split(':')[1];

    let mergedDateTime = new Date(date);
    mergedDateTime.setHours(timeHour);
    mergedDateTime.setMinutes(timeMinute);

    return mergedDateTime.toLocaleString('sv-SE', {
      timeZone: 'Europe/Stockholm',
    });
  }
}
