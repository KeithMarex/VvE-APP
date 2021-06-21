import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
import { NewsItem } from '../../../../shared/models/news-item';
import { NewsDao } from '../../../../shared/services/news-dao.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: NewsItem;
  @Output() deleteNewsItem = new EventEmitter<NewsItem>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.newsItem);
  }

  onDeleteNewsItemClicked(): void {
    this.deleteNewsItem.emit(this.newsItem);
  }

  parseDate(date: Date): string {
    return moment(date).format('llll');
  }
}
