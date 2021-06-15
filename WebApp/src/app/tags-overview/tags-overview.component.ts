import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-overview',
  templateUrl: './tags-overview.component.html',
  styleUrls: ['./tags-overview.component.scss']
})
export class TagsOverviewComponent implements OnInit {
  creatingTag = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.creatingTag = true;
  }

  onClose(): void {
    this.creatingTag = false;
  }

}
