import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { BookingService } from '../services/booking.service';
import { BookingComponent } from './booking/booking.component';
import { EventClickComponent } from './event-click/event-click.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;

  constructor(
    public dialog: MatDialog,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadEvents();

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      locale: 'sv',
      timeZone: 'Europe/Stockholm',
      nowIndicator: true,
      height: 'calc(100vh - 60px)',
      allDaySlot: false,
      slotMinTime: '17:00',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
      },
      firstDay: 1,
      expandRows: true,
      customButtons: {
        bookingButton: {
          text: 'Boka massage',
          click: () => this.openDialog(),
        },
      },
      buttonText: {
        today: 'Idag',
      },
      headerToolbar: {
        right: 'bookingButton today prev,next',
      },
      events: [],
      eventBackgroundColor: '#D67A48',
      eventBorderColor: '#D67A48',
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
      },
      eventClick: this.eventClick.bind(this),
    };
  }

  loadEvents(): void {
    this.getBookings();
    this.bookingService.bookingAction.subscribe((action: boolean) => {
      if (action) {
        this.getBookings();
      }
    });
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((data) => {
      this.calendarOptions.events = data.map((evt) => {
        return {
          start: evt.starttime,
          end: evt.endtime,
          id: evt.bookingid,
          extendedProps: {
            bodyPart: evt.bodypart,
          },
        };
      });
    });
  }

  eventClick(booking) {
    this.dialog.open(EventClickComponent, {
      autoFocus: false,
      data: {
        start: booking.event._instance.range.start,
        end: booking.event._instance.range.end,
        bodyPart: booking.event._def.extendedProps.bodyPart,
        bookingId: booking.event._def.publicId,
      },
    });
  }

  openDialog() {
    this.dialog.open(BookingComponent, {
      autoFocus: false,
    });
  }
}
