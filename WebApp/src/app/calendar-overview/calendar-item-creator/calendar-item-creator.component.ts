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
  @Output() calendarItemSaved: EventEmitter<void> = new EventEmitter();
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
      const updatedItem = this.calendarService.customEventToCalendarItem(this.calendarItemToEdit);
      updatedItem.title = title;
      updatedItem.description = description;
      updatedItem.date = startDate;
      updatedItem.endDate = endDate;

      this.calendarDao.updateCalendarItem(updatedItem)
        .subscribe((updatedCalendarItem) => {
          this.calendarService.updateCalendarItem(updatedCalendarItem);
          this.calendarItemSaved.emit();
        });
      return;
    }

    this.calendarDao.createCalendarItem(payload)
      .subscribe((newCalendarItem) => {
        this.calendarService.addCalendarItem(newCalendarItem);
        this.calendarItemSaved.emit();
      });
  }

  pickedDateTime(e): void {
    this.selectedDateTime = e;
  }
}
