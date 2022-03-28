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

  kroppsdelar = [
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
  ];

  constructor(private bookingService: BookingService) {
    this.kroppsdelar.sort();
    this.currentDay.getDate();
   }

  ngOnInit(): void {
    this.initForm();
    let startHours;
    let startMinutes;
    let newTillTime = new Date();
    this.form.get("fran").valueChanges.subscribe(value => {
      startHours = value.split(":")[0];
      startHours = parseInt(startHours);
      startMinutes = value.split(":")[1];
      startMinutes = parseInt(startMinutes);
      newTillTime.setHours(startHours);
      newTillTime.setMinutes(startMinutes + 20);
      this.form.get("till").setValue(newTillTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    });
  }

  initForm() {
    this.form = new FormGroup({
      kroppsdel: new FormControl(""),
      datum: new FormControl(this.currentDay, [Validators.required]),
      fran: new FormControl("17:00", [Validators.required]),
      till: new FormControl({value: "17:20", disabled: true})
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

      let kroppsdel = this.form.get("kroppsdel").value;
      this.bookingService.addBooking({start: start, end: end, kroppsdel: kroppsdel});
    } else {
      this.form.reset();
    }
  }
}
