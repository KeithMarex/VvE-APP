import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/shared/models/tag.model';
import { TagDao } from 'src/shared/services/tag-dao.service';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {
  @Input() tag: Tag;
  @Output() tagsChanged = new EventEmitter();
  editingTag = false;
  warningPopup = false;
  errorMessage: string;

  constructor(private tagDao: TagDao) { }

  ngOnInit(): void {}

  onDeleteTag() {
    this.warningPopup = true;
    // this.tagDao.deleteTag(this.tag._id)
    // .subscribe(
    //   res => {
    //     this.tagsChanged.emit();
    //   }, 
    //   errorRes => {
    //     let incomingErrorMessage = errorRes.error.message;
    //     if (incomingErrorMessage) {
    //       this.errorMessage = 'Er is een onbekende error opgetreden';
    //     } else {
    //       this.errorMessage = 'Er is een onbekende error opgetreden';
    //     }
    //   }
    // );
  }

  onConfirmDelete() {
    this.warningPopup = false;

    this.tagDao.deleteTag(this.tag._id)
    .subscribe(
      res => {
        this.tagsChanged.emit();
      }, 
      errorRes => {
        let incomingErrorMessage = errorRes.error.message;
        if (incomingErrorMessage) {
          this.errorMessage = 'Er is een onbekende error opgetreden';
        } else {
          this.errorMessage = 'Er is een onbekende error opgetreden';
        }
      }
    );
  }

  onCloseWarning() {
    this.warningPopup = false;
  }

  onEditTag() {
    this.editingTag = true;
  }

  onClose(): void {
    this.editingTag = false;
  }

  editTag(): void {
    this.tagsChanged.emit();
  }

}
