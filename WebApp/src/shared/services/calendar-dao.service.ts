import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../models/image.model';
import { Ticket } from '../models/ticket.model';
import { Dao } from './dao.service';

@Injectable()
export class CalendarDao {

    constructor(private dao: Dao) {}

    createCalendarItem(calendarItemData: object): Observable<any> {
      return this.dao.sendPostRequest('agenda/', calendarItemData);
    }
}
