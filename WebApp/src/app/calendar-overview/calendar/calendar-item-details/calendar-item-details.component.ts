import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import moment from 'moment';
import { isSameDay, isSameMinute } from 'date-fns';
import { CalendarItem } from '../../../../shared/models/calendar-item';
import { CalendarDao } from '../../../../shared/services/calendar-dao.service';
import {CalendarService} from "../calendar.service";

interface ParsedDate {
  weekDay: string;
  monthDate: string;
  time: string;
}

@Component({
  selector: 'app-calendar-item-details',
  templateUrl: './calendar-item-details.component.html',
  styleUrls: ['./calendar-item-details.component.scss']
})
export class CalendarItemDetailsComponent implements OnInit {
  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  @Output() closeDetails: EventEmitter<void> = new EventEmitter();
  @Input() calendarItem: CalendarItem;
  dateStrings: string[];

  constructor(
    private calendarDao: CalendarDao,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.dateStrings = this.createDateStrings();
  }

  editCalendarItem(): void {
    this.editClicked.emit();
  }

  deleteCalendarItem(): void {
    this.calendarDao.deleteCalendarItem(this.calendarItem._id)
      .subscribe(() => {
        this.calendarService.deleteCalendarItem(this.calendarItem._id);
        this.closeDetails.emit();
      });
  }

  createDateStrings(): string[] {
    const startDate = this.calendarItem.date;
    const endDate = this.calendarItem.enddate;
    const parsedStartDate = this.parseDate(startDate);
    const parsedEndDate = this.parseDate(endDate);

    if (isSameDay(startDate, endDate)) {
      return [
        this.createSameDayString(parsedStartDate, parsedEndDate, isSameMinute(startDate, endDate))
      ];
    }
    return [
      `${this.createDayStringWithoutTime(parsedStartDate)} - ${parsedStartDate.time}`,
      `${this.createDayStringWithoutTime(parsedEndDate)} - ${parsedEndDate.time}`
    ];
  }

  parseDate(date: Date): ParsedDate {
    let weekDay = moment(date).format('dddd');
    weekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
    return {
      weekDay,
      monthDate: moment(date).format('D MMMM'),
      time: moment(date).format('LT')
    };
  }

  createSameDayString(parsedStartDate: ParsedDate, parsedEndDate: ParsedDate, isAllDay: boolean): string {
    const parsedHourRange = isAllDay
      ? 'Hele dag'
      : `${parsedStartDate.time} /  ${ parsedEndDate.time}`;
    return `${this.createDayStringWithoutTime(parsedStartDate)} - ${parsedHourRange}`;
  }

  createDayStringWithoutTime(parsedDate: ParsedDate): string {
    return `${parsedDate.weekDay} ${parsedDate.monthDate}`;
  }
}
