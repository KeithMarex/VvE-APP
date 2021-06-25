import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-overview',
  templateUrl: './news-overview.component.html',
  styleUrls: ['./news-overview.component.scss']
})
export class NewsOverviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createButton(): void {
    this.router.navigate(['/news-editor', 'create'])
  }

}
