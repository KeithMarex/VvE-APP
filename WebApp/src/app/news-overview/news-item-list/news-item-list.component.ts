import { Component, OnInit } from '@angular/core';
import { NewsDao } from '../../../shared/services/news-dao.service';
import { NewsItem } from '../../../shared/models/news-item';
import News from "../../../../../API/models/News";

@Component({
  selector: 'app-news-item-list',
  templateUrl: './news-item-list.component.html',
  styleUrls: ['./news-item-list.component.scss']
})
export class NewsItemListComponent implements OnInit {
  newsItems: NewsItem[];

  constructor(
    private newsDao: NewsDao
  ) { }

  ngOnInit(): void {
    this.fetchNewsItems();
  }

  fetchNewsItems(): void {
    this.newsDao.getNewsItems()
      .subscribe((newsItems) => {
        this.newsItems = newsItems;
      });
  }

  deleteNewsItem(newsItem: NewsItem): void {
    this.newsDao.deleteCalendarItem(newsItem._id)
      .subscribe(() => {
        const removeIndex = this.newsItems.map(item => item._id).indexOf(newsItem._id);
        this.newsItems.splice(removeIndex, 1);
      });
  }

}
