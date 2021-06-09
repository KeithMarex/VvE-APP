import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DaterangepickerComponent } from 'ngx-daterangepicker-material';
import { CalendarDao } from 'src/shared/services/calendar-dao.service';
import { CalendarService } from '../calendar/calendar.service';
import moment from 'moment';
import { CustomEvent } from '../calendar/custom-event';
moment.locale('nl');

@Component({
  selector: 'app-calendar-item-creator',
  templateUrl: './calendar-item-creator.component.html',
  styleUrls: ['./calendar-item-creator.component.scss']
})
export class CalendarItemCreatorComponent implements OnInit {
  @Output() calendarItemCreated: EventEmitter<void> = new EventEmitter();
  @Input() isEditing: boolean;
  @Input() calendarItemToEdit: CustomEvent;
  selectedDateTime: {startDate: moment.Moment, endDate: moment.Moment};
  inlineDate: any;
  picker: DaterangepickerComponent;
  locale: {};
  title: string;
  description: string;

  constructor(private calendarDao: CalendarDao, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.locale = {
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.months(),
      firstDay: moment.localeData().firstDayOfWeek()
    };

    this.calendarItemToEdit ? this.initEditItem() : this.initCreateItem();
  }

  initCreateItem(): void {
    this.selectedDateTime = {
      startDate: moment().startOf('day'),
      endDate: moment().startOf('day')
    };
  }

  initEditItem(): void {
    this.title = this.calendarItemToEdit.title;
    this.description = this.calendarItemToEdit.description;
    this.selectedDateTime = {
      startDate: moment(this.calendarItemToEdit.start),
      endDate: moment(this.calendarItemToEdit.end)
    };
  }

  onSave(form: NgForm): void {
    const { title, description } = form.value;
    const startDate = this.selectedDateTime.startDate.toDate();
    const endDate = this.selectedDateTime.endDate.toDate();
    const payload = {
      title,
      description,
      date: startDate,
      enddate: endDate
    };

    if (this.isEditing) {
      // this.calendarDao.updateCalendarItem(this.calendarItemToEdit);
      return;
    }
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
