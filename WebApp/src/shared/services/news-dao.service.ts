import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dao } from './dao.service';
import { CalendarItem } from '../models/calendar-item';
import {NewsItem} from "../models/news-item";

@Injectable()
export class NewsDao {

  constructor(private dao: Dao) {}

  getNewsItems(): Observable<NewsItem[]> {
    return this.dao.sendGetRequest('news');
  }

  getNewsItem(id): Observable<NewsItem[]> {
    return this.dao.sendGetRequest('news/' + id);
  }

  createNewsItem(payload: object): Observable<NewsItem> {
    return this.dao.sendPostRequest('news/', payload);
  }

  deleteCalendarItem(id: string): Observable<NewsItem> {
    return this.dao.sendDeleteRequest('news/' + id);
  }
}
