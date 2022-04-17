import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BookingComponent } from './calendar/booking/booking.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EventClickComponent } from './calendar/event-click/event-click.component';
import { MatIconModule } from '@angular/material/icon';
import { BookingFormComponent } from './calendar/booking-form/booking-form.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    BookingComponent,
    EventClickComponent,
    BookingFormComponent,
  ],
  exports: [CalendarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'sv-SE' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
