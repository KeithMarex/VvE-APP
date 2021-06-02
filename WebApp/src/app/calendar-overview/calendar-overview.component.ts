import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.scss']
})
export class CalendarOverviewComponent implements OnInit {
  creatingCalendarItem: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(): void {
    this.creatingCalendarItem = true;
  }

  onCloseAddItemPopUp(): void {
    this.creatingCalendarItem = false;
  }

}
