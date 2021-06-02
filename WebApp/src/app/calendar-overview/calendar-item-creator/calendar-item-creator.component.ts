import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
moment.locale('nl')

@Component({
  selector: 'app-calendar-item-creator',
  templateUrl: './calendar-item-creator.component.html',
  styleUrls: ['./calendar-item-creator.component.scss']
})
export class CalendarItemCreatorComponent implements OnInit {
  selected: {startDate: moment.Moment, endDate: moment.Moment};
  inlineDate: any;
  dateTime: any;
  picker: DaterangepickerComponent;
  locale: {};

  constructor() { }

  ngOnInit() {
    this.selected = {
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day')
    }
    this.locale = {
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.months(),
      firstDay: moment.localeData().firstDayOfWeek()
    }
    console.log(this.selected)
  }

  pickedDateTime(e) {
    this.dateTime = e;
  }
}
