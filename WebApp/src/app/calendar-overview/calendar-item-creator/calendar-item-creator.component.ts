import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { CalendarDao } from 'src/shared/services/calendar-dao.service';
import { CalendarService } from '../calendar/calendar.service';
import moment from 'moment';
moment.locale('nl');

@Component({
  selector: 'app-calendar-item-creator',
  templateUrl: './calendar-item-creator.component.html',
  styleUrls: ['./calendar-item-creator.component.scss']
})
export class CalendarItemCreatorComponent implements OnInit {
  @Output() calendarItemCreated = new EventEmitter();
  selectedDateTime: {startDate: moment.Moment, endDate: moment.Moment};
  inlineDate: any;
  picker: DaterangepickerComponent;
  locale: {};

  constructor(private calendarDao: CalendarDao, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.selectedDateTime = {
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day')
    };
    this.locale = {
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.months(),
      firstDay: moment.localeData().firstDayOfWeek()
    };
  }

  onCreateItem(form: NgForm): void {
    const { title, description } = form.value;

    const startDate = this.selectedDateTime.startDate.toDate();
    const endDate = this.selectedDateTime.endDate.toDate();

    const payload = {
      title,
      description,
      date: startDate,
      enddate: endDate
    };

    this.calendarDao.createCalendarItem(payload)
      .subscribe((newCalendarItem) => {
        this.calendarService.addCalendarItem(newCalendarItem);
        this.calendarItemCreated.emit();
      });
  }

  pickedDateTime(e): void {
    this.selectedDateTime = e;
  }
}
