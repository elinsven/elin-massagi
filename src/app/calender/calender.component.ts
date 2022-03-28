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
      locale: "sv",
      nowIndicator: true,
      height: 700,
      contentHeight: 700,
      allDaySlot: false,
      slotMinTime: '17:00',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      },
      firstDay: 1,
      expandRows: true,
      customButtons: {
        bookingButton: {
          text: 'Boka massage',
          click: () => this.openDialog()
        }
      },
      buttonText: {
        today:    'Idag',
      },
      headerToolbar: {
        right: 'bookingButton today prev,next'
      },
      events: [],
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      }
    };
  }

  loadEvents(): void {
    this.bookingService.getBookings().subscribe(res => {
      this.calendarOptions.events = res.map(evt => {
        let start = new Date(evt.start.seconds * 1000).toISOString();
        let end = new Date(evt.end.seconds * 1000).toISOString();
        return {start: start, end: end};
      })
    })
  } 

  openDialog() {
    this.dialog.open(BookingComponent);
  } 
  
}
