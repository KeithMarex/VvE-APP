import {Component, Input, OnInit} from '@angular/core';
import moment from 'moment';
import { isSameDay } from 'date-fns';
import { CalendarItem } from '../../../../shared/models/calendar-item';

@Component({
  selector: 'app-calendar-item-details',
  templateUrl: './calendar-item-details.component.html',
  styleUrls: ['./calendar-item-details.component.scss']
})
export class CalendarItemDetailsComponent implements OnInit {
  @Input() calendarItem: CalendarItem;
  dateString: string;

  constructor() { }

  ngOnInit(): void {
    this.createDateString();
  }

  createDateString(): void {
    let parsedDate = '';
    const startDate = this.calendarItem.date;
    const endDate = this.calendarItem.enddate;

    const parsedStartDate = this.parseDate(startDate);
    const parsedEndDate = this.parseDate(endDate);

    console.log(startDate);
    console.log(endDate);
    if (isSameDay(startDate, endDate)) {
      parsedDate = `${parsedStartDate.weekDay} ${parsedStartDate.monthDate} - ${parsedStartDate.time} / ${ parsedEndDate.time}`;
    }
    // parsedDate = startWeekDay + ' ' + startMonthDay + ' - ' + startTime;
    this.dateString = parsedDate;
  }

  parseDate(date: Date): { weekDay, monthDate, time } {
    return {
      weekDay: moment(date).format('dddd'),
      monthDate: moment(date).format('D MMMM'),
      time: moment(date).format('LT')
    };
  }
}
