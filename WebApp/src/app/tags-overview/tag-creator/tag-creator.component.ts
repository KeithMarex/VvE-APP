import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagDao } from 'src/shared/services/tag-dao.service';

@Component({
  selector: 'app-tag-creator',
  templateUrl: './tag-creator.component.html',
  styleUrls: ['./tag-creator.component.scss']
})
export class TagCreatorComponent implements OnInit {
  @Output() tagCreated = new EventEmitter();
  errorMessage: string;
  tagColor: string;

  constructor(private tagDao: TagDao) { }

  ngOnInit(): void {
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

    this.tagDao.createTag(mForm)
    .subscribe(
      res => {
      this.tagCreated.emit();
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