import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingForm, BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  form: FormGroup;
  currentDay = new Date();

  kroppsdelar: any = [
    "Fötter",
    "Vader",
    "Lår",
    "Rumpa",
    "Mage",
    "Rygg",
    "Axlar",
    "Nacke",
    "Huvud",
    "Armar",
    "Händer"
  ]

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.initForm();
    this.currentDay.getDate();
  }

  initForm() {
    this.form = new FormGroup({
      kroppsdel: new FormControl("", [Validators.required]),
      fornamn: new FormControl("", [Validators.required]),
      efternamn: new FormControl("", [Validators.required]),
      datum: new FormControl("", [Validators.required]),
      fran: new FormControl("", [Validators.required]),
      till: new FormControl("", [Validators.required])
    })
  }

  onSend() {
    if (this.form.valid) {
      let startDate = this.form.get("datum").value;
      let endDate = this.form.get("datum").value;

      let startTime = this.form.get("fran").value;
      let startTimeHour = startTime.split(":")[0];
      let startTimeMinute = startTime.split(":")[1];

      let endTime = this.form.get("till").value;
      let endTimeHour = endTime.split(":")[0];
      let endTimeMinute = endTime.split(":")[1];

      let start = new Date(startDate);
      start.setHours(startTimeHour);
      start.setMinutes(startTimeMinute);

      let end = new Date(endDate);
      end.setHours(endTimeHour);
      end.setMinutes(endTimeMinute);

      let title = this.form.get("fornamn").value;
      this.bookingService.addBooking({title: title, start: start, end: end});
    } else {
      this.form.reset();
    }
  }
}
