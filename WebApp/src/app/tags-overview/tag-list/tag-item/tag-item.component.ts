import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/shared/models/tag.model';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {
  @Input() tag: Tag;
  shortDesc = '';

  constructor() { }

  ngOnInit(): void {
    if (this.tag.name.length > 180) {
      this.shortDesc = this.tag.name.slice(0, 180);
    }
  }

}
