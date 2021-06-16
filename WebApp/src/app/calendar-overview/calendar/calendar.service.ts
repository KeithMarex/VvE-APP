import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {isSameMinute, isSameMonth} from 'date-fns';
import { CalendarItem } from '../../../shared/models/calendar-item';
import { CustomEvent } from './custom-event';

interface FetchedMonth {
  month: Date;
  calendarItems: CalendarItem[];
}

/*
 * Manages a local array of calendar items
 */

@Injectable()
export class CalendarService {
  calendarItems = new BehaviorSubject<CalendarItem[]>([]);
  fetchedMonths: FetchedMonth[] = []; // For storing months that have already been fetched

  constructor() { }

  customEventToCalendarItem(event: CustomEvent): CalendarItem {
    return new CalendarItem(
      event.id,
      event.title,
      event.description,
      event.start,
      event.end
    );
  }

  calendarItemToCustomEvent(calItem: CalendarItem, actions): CustomEvent {
    const startDate = new Date(calItem.date);
    const endDate = calItem.enddate ? new Date(calItem.enddate) : undefined;
    const allDay = isSameMinute(startDate, endDate);

    const customEvent: CustomEvent[] = [];
    customEvent.push({
      start: startDate,
      end: endDate,
      title: calItem.title,
      description: calItem.description,
      id: calItem._id,
      allDay,
      actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    });

    return customEvent[0];
  }

  updateCalendarItem(calendarItem: CalendarItem): void {
    const calendarItems = this.calendarItems.getValue();
    const updatedCalendarItemIndex = calendarItems.findIndex(
      (item) => item._id === calendarItem._id
    );
    calendarItems[updatedCalendarItemIndex] = calendarItem;

    this.calendarItems.next(calendarItems);
  }

  deleteCalendarItem(calendarItemId: string): void {
    this.calendarItems.next(
      this.calendarItems.getValue().filter((calendarItem) => {
          return calendarItem._id !== calendarItemId;
        }
      ));
  }

  setCalendarItems(calendarItems: CalendarItem[]): void {
    this.calendarItems.next(calendarItems);
  }

  addCalendarItem(calendarItem: CalendarItem): void {
    this.calendarItems.next(
      this.calendarItems.getValue().concat([calendarItem])
    );
  }

  findFetchedCalendarItems(month: Date): any {
    let foundItems = null;
    this.fetchedMonths.forEach((fetchedMonth) => {
      if (isSameMonth(fetchedMonth.month, month)) {
        foundItems = fetchedMonth.calendarItems;
        return;
      }
    });
    return foundItems;
  }

  storeFetchedMonth(month: Date): void {
    let monthIsStored = false;
    this.fetchedMonths.forEach((fetchedMonth) => {
      if (isSameMonth(fetchedMonth.month, month)) {
        monthIsStored = true;
      }
    });
    if (!monthIsStored) {
      this.fetchedMonths.push({
        month,
        calendarItems: this.calendarItems.getValue()
      });
    }
  }
}
