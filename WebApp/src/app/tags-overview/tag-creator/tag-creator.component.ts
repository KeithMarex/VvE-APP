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

  constructor(private tagDao: TagDao) { }

  ngOnInit(): void {
  }

  onCreateTag(form: NgForm) {
    const formValues = form.value;
    
    //TODO send post request with formValues
  }

  createTag() {
    console.log("tag maken")
    const mForm = new FormData();

    mForm.append('name', "test Tag");
    mForm.append('color', "#D90600");

    this.tagDao.createTag(mForm)
    .subscribe(
      res => {
      this.tagCreated.emit();
      }, 
      errorRes => {
        let incomingErrorMessage = errorRes.error.message;
        if (incomingErrorMessage) {
          this.errorMessage = errorRes.error.message;
        } else {
          this.errorMessage = 'Er is een onbekende error opgetreden';
        }
      }
    );
  }

}