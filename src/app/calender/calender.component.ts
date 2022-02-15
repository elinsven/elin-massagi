import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { BookingComponent } from './booking/booking.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {


  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    nowIndicator: true,
    allDaySlot: false,
    slotMinTime: '17:00',
    firstDay: 1,
    height: 400,
    customButtons: {
      myCustomButton: {
        text: 'Boka massage',
        click: () => this.openDialog()
      }
    },
    headerToolbar: {
      right: 'myCustomButton today prev,next'
    },
    events: [
      {
        id: 'a',
        title: 'my event',
        start: '2022-02-14T17:30:00',
        end: '2022-02-14T19:50:00',
      }
    ],
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(BookingComponent);
  }
  
}
