import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dao } from './dao.service';
import { CalendarItem } from '../models/calendar-item';

@Injectable()
export class NewsDao {

  constructor(private dao: Dao) {}

  getNewsItems(): Observable<any[]> {
    return this.dao.sendGetRequest('news');
  }

  getNewsItem(id): Observable<any[]> {
    return this.dao.sendGetRequest('news/' + id);
  }

  createNewsItem(payload: object): Observable<any> {
    return this.dao.sendPostRequest('news/', payload);
  }

  deleteCalendarItem(id: string): Observable<any> {
    return this.dao.sendDeleteRequest('news/' + id);
  }
}
