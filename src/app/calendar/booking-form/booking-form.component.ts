import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface BookingForm {
  bodyPart: string[];
  date: Date;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit {
  @Input() headerTitle: string;
  @Input() isEditable: boolean = false;
  @Input() bookingMode: boolean = false;
  @Input() bodyPartValue: string[] = [];
  @Input() dateValue: Date;
  @Input() startTimeValue: string = '17:00';
  @Input() endTimeValue: string = '17:20';

  @Output() onBook = new EventEmitter<BookingForm>();
  @Output() onChangeBooking = new EventEmitter<BookingForm>();
  @Output() onDeleteBooking = new EventEmitter<void>();

  bookingForm: FormGroup;
  //In i databasen
  bodyParts: string[] = [
    'Fötter',
    'Vader',
    'Lår',
    'Rumpa',
    'Mage',
    'Rygg',
    'Axlar',
    'Nacke',
    'Huvud',
    'Armar',
    'Händer',
  ];

  constructor() {}

  ngOnInit(): void {
    this.initForm();

    this.bookingForm.get('startTime').valueChanges.subscribe((value) => {
      this.bookingForm.get('endTime').setValue(this.calculateFormValue(value));
    });
  }

  initForm(): void {
    this.bookingForm = new FormGroup({
      bodyPart: new FormControl(
        { value: this.bodyPartValue, disabled: this.isEditable },
        Validators.required
      ),
      date: new FormControl({ value: this.dateValue, disabled: this.isEditable }),
      startTime: new FormControl({
        value: this.startTimeValue,
        disabled: this.isEditable,
      }),
      endTime: new FormControl({ value: this.endTimeValue, disabled: true }),
    });
  }

  transitionToChange(): void {
    this.isEditable = false;
    this.bookingForm.enable();
    this.bookingForm.get('endTime').disable();
  }

  private calculateFormValue(formValue: string) {
    let hours;
    let minutes;
    let calculatedDate = new Date();

    hours = formValue?.split(':')[0];
    hours = parseInt(hours);
    minutes = formValue?.split(':')[1];
    minutes = parseInt(minutes);

    calculatedDate.setHours(hours);
    calculatedDate.setMinutes(minutes + 20);

    return calculatedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
