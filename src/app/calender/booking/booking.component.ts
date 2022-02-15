import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  form: FormGroup;

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

  constructor() { }

  ngOnInit(): void {
    this.initForm();
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
      console.log(this.form.value)
    } else {
      this.form.reset();
    }
  }
}
