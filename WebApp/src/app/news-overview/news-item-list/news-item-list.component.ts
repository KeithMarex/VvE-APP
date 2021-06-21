import { Component, OnInit } from '@angular/core';
import { NewsDao } from '../../../shared/services/news-dao.service';
import { NewsItem } from '../../../shared/models/news-item';

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

}
