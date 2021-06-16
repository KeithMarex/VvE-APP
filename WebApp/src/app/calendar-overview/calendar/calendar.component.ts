import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomEvent, CustomEventAction, CustomEventTimesChangedEvent } from './custom-event';
import { CalendarView } from 'angular-calendar';
import { CalendarDao } from '../../../shared/services/calendar-dao.service';
import { CalendarItem } from '../../../shared/models/calendar-item';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.scss'],
  templateUrl: 'calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  currentView: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  locale = 'nl';
  selectedCalendarItemToShow: CalendarItem;
  selectedCalendarItemToEdit: CalendarItem;
  calendarItemsToShow: CustomEvent[] = [];
  activeDayIsOpen = true;
  currentMonth: Date;
  actions: CustomEventAction[] = [
    {
      label: '<span class="calendar-icon calendar-edit-icon"/>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CustomEvent }): void => {
        this.editCalendarItemFromEvent(event);
      },
    },
    {
      label: '<span class="calendar-icon calendar-delete-icon"/>',
      a11yLabel: 'Delete',
      onClick: (({ event }: { event: CustomEvent }): void => {
        this.deleteCalendarItem(event);
      }),
    },
  ];

  constructor(
    private calendarDao: CalendarDao,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.calendarService.calendarItems
      .subscribe((calendarItems) => {
        this.displayCalendarItems(calendarItems);
      });

    this.currentMonth = new Date();
    this.fetchMonthItems(this.currentMonth);
  }

  displayCalendarItems(calendarItems: CalendarItem[]): void {
    this.calendarItemsToShow =
      this.calendarService.parseCalendarItemsToDisplayable(calendarItems, this.actions);
    this.refresh.next();
  }

  fetchMonthItems(newDate: Date, oldDate?: Date): void {
    if (oldDate) {
      const foundFetchedMonthItems =
        this.calendarService.overwriteWithNewMonthItems(newDate, oldDate);
      if (foundFetchedMonthItems) {
        this.currentMonth = newDate;
        return;
      }
    }
    this.calendarService.fetchMonthAndSurroundingMonthsItems(newDate);
    this.currentMonth = newDate;
  }

  dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    if (!isSameMonth(date, this.viewDate)) {
      return;
    }
    this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0);
    this.viewDate = date;
  }

  calendarItemTimesChanged({ event, newStart, newEnd }: CustomEventTimesChangedEvent): void {
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    const editedCalendarItem = this.calendarService.customEventToCalendarItem(event);
    this.calendarDao.updateCalendarItem(editedCalendarItem)
      .subscribe(() => {
        this.calendarService.updateCalendarItem(editedCalendarItem);
      });
  }

  deleteCalendarItem(calendarItemToDelete: CustomEvent): void {
    this.calendarDao.deleteCalendarItem(calendarItemToDelete.id)
      .subscribe(() => {
        this.calendarService.deleteCalendarItem(calendarItemToDelete.id);
      });
  }

  editCalendarItemFromEvent(calendarItemToEdit: CustomEvent): void {
    this.selectedCalendarItemToEdit =
      this.calendarService.customEventToCalendarItem(calendarItemToEdit);
  }

  editCalendarItemFromDetails(calendarItemToEdit: CalendarItem): void {
    this.closeCalendarItemPopUps();
    this.selectedCalendarItemToEdit = calendarItemToEdit;
  }

  setCalendarViewType(view: CalendarView): void {
    this.currentView = view;
  }

  onCalendarDateChanged(newDate: Date): void {
    const oldDate = this.currentMonth;
    if (!isSameMonth(newDate, oldDate)) {
      this.fetchMonthItems(newDate, oldDate);
    }
    this.activeDayIsOpen = false;
  }

  showCalendarItemPopUp(calendarItemToShow: CustomEvent): void {
    this.selectedCalendarItemToShow =
      this.calendarService.customEventToCalendarItem(calendarItemToShow);
  }

  closeCalendarItemPopUps(): void {
    this.selectedCalendarItemToShow = null;
    this.selectedCalendarItemToEdit = null;
  }
}
