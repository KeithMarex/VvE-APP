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
      this.tags.push(new Tag('1', 'prachtige tag', '#C40000', new Date(), new Date()));
      this.tags.push(new Tag('2', 'leuke tag', '#14FF01', new Date(), new Date()));
    // this.tagDao.getAllTags()
    // .subscribe((incomingtags: Tag[]) => {
    //   incomingtags.forEach(incomingTag => {
    //     this.tags.push(new Tag(
    //       incomingTag._id,
    //       incomingTag.name,
    //       incomingTag.color,
    //       incomingTag.createdAt,
    //       incomingTag.updatedAt
    //     ))
    //   })
    // });
      console.log(this.tags);
  }

}
