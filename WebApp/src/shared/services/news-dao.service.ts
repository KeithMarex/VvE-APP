import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dao } from './dao.service';
import { NewsItem } from '../models/news-item';

@Injectable()
export class NewsDao {

  constructor(private dao: Dao) {}

  getNewsItems(): Observable<NewsItem[]> {
    return this.dao.sendGetRequest('news');
  }

  getNewsItem(id): Observable<NewsItem> {
    return this.dao.sendGetRequest('news/' + id);
  }

  createNewsItem(payload: object): Observable<NewsItem> {
    return this.dao.sendPostRequestForm('news/', payload);
  }

  updateNewsItem(payload: object): Observable<any> {
    return this.dao.sendPutRequestForm('news/', payload);
  }

  deleteCalendarItem(id: string): Observable<NewsItem> {
    return this.dao.sendDeleteRequest('news/' + id);
  }
}
