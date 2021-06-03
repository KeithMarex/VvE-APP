import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.scss']
})
export class CalendarOverviewComponent implements OnInit {
  creatingCalendarItem: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onAddItemClicked(): void {
    this.creatingCalendarItem = true;
  }

  onAddItemPopUpClosed(): void {
    this.creatingCalendarItem = false;
  }

  onCalendarItemCreated(calendarItem: any): void {
    this.creatingCalendarItem = false;
  }

}
