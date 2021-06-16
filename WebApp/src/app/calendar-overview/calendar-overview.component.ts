import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.scss']
})
export class CalendarOverviewComponent {
  creatingCalendarItem: boolean;

  constructor() { }

  onAddItemClicked(): void {
    this.creatingCalendarItem = true;
  }

  onAddItemPopUpClosed(): void {
    this.creatingCalendarItem = false;
  }
}
