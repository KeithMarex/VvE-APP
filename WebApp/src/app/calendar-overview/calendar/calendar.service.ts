import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AgendaItem } from '../../../shared/models/agenda-item';

@Injectable()
export class CalendarService {
  calendarItems = new BehaviorSubject<AgendaItem[]>([]);

  constructor() { }

  setCalendarItems(calendarItems: AgendaItem[]): void {
    this.calendarItems.next(calendarItems);
  }

  addCalendarItem(calendarItem: AgendaItem): void {
    this.calendarItems.next(this.calendarItems.getValue().concat([calendarItem]));
  }

  updateCalendarItem(calendarItem: AgendaItem): void {
    const calendarItems = this.calendarItems.getValue();
    const updatedCalendarItemIndex = calendarItems.findIndex((item) => item._id === calendarItem._id);
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

  calendarItemsIsEmpty(): boolean {
    return this.calendarItems.value.length <= 0;
  }
}
