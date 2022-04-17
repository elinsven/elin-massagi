import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking, BookingService } from 'src/app/services/booking.service';
import { BookingForm } from '../booking-form/booking-form.component';

@Component({
  selector: 'app-event-click',
  templateUrl: './event-click.component.html',
  styleUrls: ['./event-click.component.scss'],
})
export class EventClickComponent implements OnInit {
  isEditable: boolean = true;
  startTime: any;
  endTime: any;
  chosenBodyParts: string[] = [];
  booking: BookingForm;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { start: Date; end: Date; bodyPart: string[]; bookingId },
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.startTime = this.convertToCorrectTimezone(this.data.start);
    this.endTime = this.convertToCorrectTimezone(this.data.end);

    for (const bodypart in this.data.bodyPart) {
      this.chosenBodyParts.push(this.data.bodyPart[bodypart]);
    }
  }

  onChangeBooking(booking: BookingForm): void {
    this.booking = booking;
    const updateBooking: Booking = {
      starttime: this.mergeDateAndTime(booking.startTime),
      endtime: this.mergeDateAndTime(booking.endTime),
      bodypart: booking.bodyPart,
    };

    this.bookingService
      .updateBooking(this.data.bookingId, updateBooking)
      .subscribe(() => {
        this.snackBar.open('Bokning ändrad', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  onDeleteBooking(): void {
    this.bookingService.deleteBooking(this.data.bookingId);
    this.snackBar.open('Bokning borttagen', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
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

  private convertToCorrectTimezone(date: Date): string {
    return new Date(
      date.getTime() - date.getTimezoneOffset() * -60000
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
