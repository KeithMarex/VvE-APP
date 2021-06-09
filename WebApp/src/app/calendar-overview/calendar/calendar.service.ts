import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarItem } from '../../../shared/models/calendar-item';
import { CustomEvent } from './custom-event';

/**
 * Manages a local array of calendar items
 */

@Injectable()
export class CalendarService {
  calendarItems = new BehaviorSubject<CalendarItem[]>([]);
  colors: any = {
    primary: {
      primary: '#441C62',
      secondary: '#441C6226', // Primary with 15% opacity (hex+26)
    },
  };

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

    const customEvent: CustomEvent[] = [];
    customEvent.push({
      start: startDate,
      end: endDate,
      title: calItem.title,
      description: calItem.description,
      id: calItem._id,
      color: this.colors.primary,
      allDay: !calItem.enddate,
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

  calendarItemsIsEmpty(): boolean {
    return this.calendarItems.value.length <= 0;
  }
}