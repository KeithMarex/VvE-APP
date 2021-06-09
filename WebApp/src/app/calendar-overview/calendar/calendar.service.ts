import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AgendaItem } from '../../../shared/models/agenda-item';
import { CustomEvent } from './custom-event';

/**
 * Manages a local array of calendar items
 */

@Injectable()
export class CalendarService {
  calendarItems = new BehaviorSubject<AgendaItem[]>([]);
  colors: any = {
    primary: {
      primary: '#441C62',
      secondary: '#441C6226', // Primary with 15% opacity (hex+26)
    },
  };

  constructor() { }

  customEventToCalendarItem(event: CustomEvent): AgendaItem {
    return new AgendaItem(
      event.id,
      event.title,
      event.description,
      event.start,
      event.end
    );
  }

  calendarItemToCustomEvent(calItem: AgendaItem, actions): CustomEvent {
    const startDate = new Date(calItem.date);
    const endDate = calItem.endDate ? new Date(calItem.endDate) : undefined;

    const customEvent: CustomEvent[] = [];
    customEvent.push({
      start: startDate,
      end: endDate,
      title: calItem.title,
      description: calItem.description,
      id: calItem._id,
      color: this.colors.primary,
      allDay: !!calItem.endDate,
      actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    });

    return customEvent[0];
  }

  updateCalendarItem(calendarItem: AgendaItem): void {
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

  setCalendarItems(calendarItems: AgendaItem[]): void {
    this.calendarItems.next(calendarItems);
  }

  addCalendarItem(calendarItem: AgendaItem): void {
    this.calendarItems.next(
      this.calendarItems.getValue().concat([calendarItem])
    );
  }

  calendarItemsIsEmpty(): boolean {
    return this.calendarItems.value.length <= 0;
  }
}
