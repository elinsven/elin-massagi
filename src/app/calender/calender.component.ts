import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { Firestore } from 'firebase/firestore';
import { BookingService } from '../services/booking.service';
import { BookingComponent } from './booking/booking.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  events = [];
  calendarOptions: CalendarOptions;

  constructor(public dialog: MatDialog, private bookingService: BookingService) { }

  ngOnInit(): void {
   this.loadEvents();

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      nowIndicator: true,
      allDaySlot: false,
      slotMinTime: '17:00',
      firstDay: 1,
      height: 400,
      customButtons: {
        bookingButton: {
          text: 'Boka massage',
          click: () => this.openDialog()
        }
      },
      headerToolbar: {
        right: 'bookingButton today prev,next'
      },
      events: []
    };
  }

  loadEvents(): void {
    this.bookingService.getBookings().subscribe(res => {
      this.calendarOptions.events = res.map(evt => {
        let start = new Date(evt.start.seconds * 1000).toISOString();
        let end = new Date(evt.end.seconds * 1000).toISOString();
        return {title: evt.title, start: start, end: end};
      })
    })
  } 

  openDialog() {
    this.dialog.open(BookingComponent);
  } 
  
}
