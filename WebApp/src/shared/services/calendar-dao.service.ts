import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dao } from './dao.service';
import { AgendaItem } from '../models/agenda-item';

@Injectable()
export class CalendarDao {

    constructor(private dao: Dao) {}

    createCalendarItem(calendarItemData: object): Observable<AgendaItem> {
      return this.dao.sendPostRequest('agenda/', calendarItemData);
    }

    getCalendarItems(month: string): Observable<AgendaItem[]> {
      return this.dao.sendGetRequest('agenda/' + month)
        .pipe(map((response: AgendaItem[]) => {
          return response;
        }));
    }

    deleteCalendarItem(calendarItemId: string): Observable<any> {
      return this.dao.sendDeleteRequest('agenda/' + calendarItemId);
    }
}
