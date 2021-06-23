import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
import { NewsItem } from '../../../../shared/models/news-item';
import { DataStorageService } from '../../../../shared/services/data-storage.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: NewsItem;
  @Output() deleteNewsItem = new EventEmitter<NewsItem>();
  thumbnailUrl: string;

  constructor(
    private dataStorage: DataStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.thumbnailUrl = !!this.newsItem.thumbnail["image_url"]
      ? this.newsItem.thumbnail["image_url"]
      : this.dataStorage.logoUrl.getValue();
  }

  updateButton(id: string): void {
    this.router.navigate(['/news-editor', id]);
  }

  onDeleteNewsItemClicked(): void {
    this.deleteNewsItem.emit(this.newsItem);
  }

  parseDate(date: Date): string {
    return moment(date).format('llll');
  }
}
