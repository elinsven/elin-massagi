import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calendarOptions = {};
  calendarValue: any = null;

  onChooseDate(date: any) {
    this.calendarValue = date;
}
}


