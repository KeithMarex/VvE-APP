import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dao } from './dao.service';
import { CalendarItem } from '../models/calendar-item';

@Injectable()
export class CalendarDao {

  constructor(private dao: Dao) {}

  getCalendarItems(month: string): Observable<CalendarItem[]> {
    return this.dao.sendGetRequest('agenda/' + month)
      .pipe(map((response: CalendarItem[]) => {
        return response;
      }));
  }

  createCalendarItem(calendarItemData: object): Observable<CalendarItem> {
    return this.dao.sendPostRequest('agenda/', calendarItemData);
  }

  updateCalendarItem(calendarItemData: CalendarItem): Observable<CalendarItem> {
    return this.dao.sendPutRequest('agenda/' + calendarItemData._id, calendarItemData);
  }

  deleteCalendarItem(calendarItemId: string): Observable<any> {
    return this.dao.sendDeleteRequest('agenda/' + calendarItemId);
  }
}
