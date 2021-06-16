import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/shared/models/tag.model';
import { TagDao } from 'src/shared/services/tag-dao.service';


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [];

  constructor(
    private tagDao: TagDao
  ) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagDao.getAllTags()
    .subscribe((incomingtags: Tag[]) => {
      incomingtags.forEach(incomingTag => {
        this.tags.push(new Tag(
          incomingTag._id,
          incomingTag.name,
          incomingTag.color,
          incomingTag.createdAt,
          incomingTag.updatedAt
        ))
      })
    });
  }

  deleteTag(): void {
    window.location.reload();
  }
}
