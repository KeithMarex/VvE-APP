import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {eachDayOfInterval, endOfDay, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarView} from 'angular-calendar';
import {CustomEvent, CustomEventAction, CustomEventTimesChangedEvent} from './custom-event';
import {CalendarDao} from '../../../shared/services/calendar-dao.service';
import {AgendaItem} from '../../../shared/models/agenda-item';
import {CalendarService} from "./calendar.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

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

  modalEvent: CustomEvent;

  isEventsToday: boolean;

  actions: CustomEventAction[] = [
    {
      label: '<span class="calendar-icon calendar-edit-icon"/>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CustomEvent }): void => {
        this.editEvent(event);
      },
    },
    {
      label: '<span class="calendar-icon calendar-delete-icon"/>',
      a11yLabel: 'Delete',
      onClick: (({ event }: { event: CustomEvent }): void => {
        this.deleteEvent(event);
      }),
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CustomEvent[] = [];
  // events: CustomEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'VvE pyjama party',
  //     description: 'Iedereen is welkom bij dit fantastische pyjama feestje. Trek je mooiste pyjama aan en neem een goed humeur mee.',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //     id: 'abc123'
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     description: '2',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     description: '3',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     description: '3',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

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
        .subscribe(responseCalItems => {
          this.calendarService.setCalendarItems(responseCalItems);
        });
    }
  }

  parseCalendarItems(calItems: AgendaItem[]): void {
    const parsedEvents: CustomEvent[] = [];
    const now = new Date();

    calItems.forEach((calItem) => {
      const startDate = new Date(calItem.date);
      const endDate = calItem.endDate ? new Date(calItem.endDate) : undefined;

      if (!this.isEventsToday && this.eventIsToday(now, startDate, endDate)) {
        this.isEventsToday = true;
      }

      parsedEvents.push({
        start: startDate,
        end: endDate,
        title: calItem.title,
        description: calItem.description,
        id: calItem._id,
        color: colors.blue,
        allDay: !!calItem.endDate,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      });
    });

    this.events = parsedEvents;
  }

  eventIsToday(now: Date, startDate: Date, endDate: Date): boolean {
    const dayRange =
      endDate ? eachDayOfInterval({start: startDate, end: endDate}) : [startDate];
    dayRange.forEach((day) => {
      if (isSameDay(now, day)) {
        return true;
      }
    });
    return false;
  }

  dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CustomEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // TODO handle change
    console.log(event);
  }

  handleEvent(action: string, event: CustomEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        description: 'New',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        id: 'a',
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CustomEvent): void {
    this.calendarDao.deleteCalendarItem(eventToDelete.id)
      .subscribe((res) => {
        if (res.status !== 200) {
          return alert('Agendapunt kon niet verwijderd worden.');
        }
        this.events = this.events.filter((event) => event !== eventToDelete);
      });
  }

  editEvent(eventToEdit: CustomEvent): void {
    this.modalEvent = eventToEdit;
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  showEventPopUp(eventToShow: CustomEvent): void {
    this.modalEvent = eventToShow;
  }

  closeEventPopUp(): void {
    this.modalEvent = null;
  }
}
