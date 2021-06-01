import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagDao } from 'src/shared/services/tag-dao.service';

@Component({
  selector: 'app-tag-creator',
  templateUrl: './tag-creator.component.html',
  styleUrls: ['./tag-creator.component.scss']
})
export class TagCreatorComponent implements OnInit {

  constructor(private tagDao: TagDao) { }

  ngOnInit(): void {
  }

  onCreateTag(form: NgForm) {
    const formValues = form.value;
    
    //TODO send post request with formValues
  }

}