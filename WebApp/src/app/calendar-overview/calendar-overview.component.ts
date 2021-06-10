import { Component, OnInit } from '@angular/core';

/**
 * Parent component for the calendar
 */

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
