import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarView } from 'angular-calendar';
import { CustomEvent, CustomEventAction, CustomEventTimesChangedEvent } from './custom-event';
import { CalendarDao } from '../../../shared/services/calendar-dao.service';
import { CalendarItem } from '../../../shared/models/calendar-item';
import { CalendarService } from './calendar.service';

/**
 * Component with main calendar logic
 */

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.scss'],
  templateUrl: 'calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  currentView: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  locale = 'nl';
  selectedCalendarItemToShow: CalendarItem;
  selectedCalendarItemToEdit: CalendarItem;
  events: CustomEvent[] = [];
  activeDayIsOpen = true;
  actions: CustomEventAction[] = [
    {
      label: '<span class="calendar-icon calendar-edit-icon"/>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CustomEvent }): void => {
        this.editCalendarItem(event);
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
        this.parseCalendarItems(calendarItems);
        this.refresh.next();
      });

    if (!this.calendarService.calendarItemsIsEmpty()) { return; }
    const now = new Date();
    const monthToFetch = now.getFullYear() + '-' + (now.getMonth() + 1);
    this.calendarDao.getCalendarItems(monthToFetch)
      .subscribe(resCalItems => {
        this.calendarService.setCalendarItems(resCalItems);
      });
  }

  parseCalendarItems(calItems: CalendarItem[]): void {
    const parsedEvents: CustomEvent[] = [];

    calItems.forEach((calItem) => {
      parsedEvents.push(
        this.calendarService.calendarItemToCustomEvent(calItem, this.actions)
      );
    });
    this.events = parsedEvents;
  }

  dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
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

  editCalendarItem(calendarItemToEdit: CustomEvent): void {
    this.selectedCalendarItemToEdit =
      this.calendarService.customEventToCalendarItem(calendarItemToEdit);
  }

  setView(view: CalendarView): void {
    this.currentView = view;
  }

  closeOpenMonthViewDay(): void {
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
