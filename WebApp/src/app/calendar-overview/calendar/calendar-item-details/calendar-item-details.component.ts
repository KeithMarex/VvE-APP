import {Component, Input, OnInit} from '@angular/core';
import { CalendarItem } from '../../../../shared/models/calendar-item';

@Component({
  selector: 'app-calendar-item-details',
  templateUrl: './calendar-item-details.component.html',
  styleUrls: ['./calendar-item-details.component.scss']
})
export class CalendarItemDetailsComponent implements OnInit {
  @Input() calendarItem: CalendarItem;

  constructor() { }

  ngOnInit(): void {
  }

}
