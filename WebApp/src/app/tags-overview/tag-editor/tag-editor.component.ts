import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tag } from 'src/shared/models/tag.model';
import { TagDao } from 'src/shared/services/tag-dao.service';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {
  @Input() tag: Tag;
  @Output() tagEdited = new EventEmitter();
  errorMessage: string;
  tagColor: string;
  tagName: string;

  constructor(private tagDao: TagDao) { }

  ngOnInit(): void {
    this.tagColor = this.tag.color;
    this.tagName = this.tag.name;
  }

  createTag(form: NgForm) {
    const formValues = form.value;
    if (formValues.name.length > 10) {
      this.errorMessage = "Naam is te lang";
      return;
    }

    if (!formValues.name) {
      this.errorMessage = "Naam mag niet leeg zijn";
      return;
    }

    if (!formValues.tagColor) {
      this.errorMessage = "Kleur mag niet leeg zijn";
      return;
    }

    var mForm = {
      "name" : formValues.name,
      "color" : formValues.tagColor
    }

    this.tagDao.updateTag(this.tag._id, mForm)
    .subscribe(
      res => {
      this.tagEdited.emit();
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

}