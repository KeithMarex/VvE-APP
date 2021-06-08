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

  calendarItemsIsEmpty(): boolean {
    return this.calendarItems.value.length <= 0;
  }

  addCalendarItem(calendarItem: AgendaItem): void {
    this.calendarItems.next(this.calendarItems.getValue().concat([calendarItem]));
  }

}
