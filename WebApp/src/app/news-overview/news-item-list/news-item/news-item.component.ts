import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
import { NewsItem } from '../../../../shared/models/news-item';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input() newsItem: NewsItem;
  @Output() deleteNewsItem = new EventEmitter<NewsItem>();

  constructor() { }

  onDeleteNewsItemClicked(): void {
    this.deleteNewsItem.emit(this.newsItem);
  }

  parseDate(date: Date): string {
    return moment(date).format('llll');
  }
}
