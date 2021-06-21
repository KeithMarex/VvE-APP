import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { NewsItem } from '../../../../shared/models/news-item';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: NewsItem;

  constructor() { }

  ngOnInit(): void {
    console.log(this.newsItem);
  }

  parseDate(date: Date): string {
    return moment(date).format('llll');
  }
}
