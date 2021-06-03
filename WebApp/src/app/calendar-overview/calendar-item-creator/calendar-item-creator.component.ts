import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { CalendarDao } from 'src/shared/services/calendar-dao.service';
import moment from 'moment';
moment.locale('nl')

@Component({
  selector: 'app-calendar-item-creator',
  templateUrl: './calendar-item-creator.component.html',
  styleUrls: ['./calendar-item-creator.component.scss']
})
export class CalendarItemCreatorComponent implements OnInit {
  @Output() calendarItemCreated = new EventEmitter();
  selected: {startDate: moment.Moment, endDate: moment.Moment};
  inlineDate: any;
  dateTime: any;
  picker: DaterangepickerComponent;
  locale: {};

  constructor(private calendarDao: CalendarDao) { }

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
  }

  onCreateItem(form: NgForm) {
    const { title, description } = form.value;
    const endDate = this.selected.endDate.toDate();
    const startDate = this.selected.startDate.toDate();

    const payload = {
      title,
      description,
      startDate,
      endDate
    }

    this.calendarDao.createCalendarItem(payload)
      .subscribe(response => {
        this.calendarItemCreated.emit();
      })
  }

  pickedDateTime(e) {
    this.dateTime = e;
  }
}
