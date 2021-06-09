import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarView} from 'angular-calendar';
import {CustomEvent, CustomEventAction, CustomEventTimesChangedEvent} from './custom-event';
import {CalendarDao} from '../../../shared/services/calendar-dao.service';
import {AgendaItem} from '../../../shared/models/agenda-item';
import {CalendarService} from './calendar.service';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.scss'],
  templateUrl: 'calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  locale = 'nl';

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  selectedCalendarItemToShow: CustomEvent;
  selectedCalendarItemToEdit: CustomEvent;

  isEventsToday: boolean;

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

  refresh: Subject<any> = new Subject();

  events: CustomEvent[] = [];

  activeDayIsOpen = true;

  constructor(private calendarDao: CalendarDao, private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.calendarItems
      .subscribe((calendarItems) => {
        this.parseCalendarItems(calendarItems);
        this.refresh.next();
      });

    if (this.calendarService.calendarItemsIsEmpty()) {
      this.calendarDao.getCalendarItems('2021-6')
        .subscribe(resCalItems => {
          this.calendarService.setCalendarItems(resCalItems);
        });
    }
  }

  parseCalendarItems(calItems: AgendaItem[]): void {
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
    event.end = newEnd;
    const editedCalendarItem = this.calendarService.customEventToCalendarItem(event);
    this.calendarDao.updateCalendarItem(editedCalendarItem)
      .subscribe(() => {
        this.calendarService.updateCalendarItem(editedCalendarItem);
      });
  }

  deleteCalendarItem(eventToDelete: CustomEvent): void {
    this.calendarDao.deleteCalendarItem(eventToDelete.id)
      .subscribe(() => {
        this.calendarService.deleteCalendarItem(eventToDelete.id);
      });
  }

  editCalendarItem(eventToEdit: CustomEvent): void {
    this.selectedCalendarItemToEdit = eventToEdit;
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  showCalendarItemPopUp(eventToShow: CustomEvent): void {
    this.selectedCalendarItemToShow = eventToShow;
  }

  closeCalendarItemPopUps(): void {
    this.selectedCalendarItemToShow = null;
    this.selectedCalendarItemToEdit = null;
  }
}
