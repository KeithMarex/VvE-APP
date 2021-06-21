import { Component, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators, toDoc } from 'ngx-editor';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsCreateComponent implements OnInit, OnDestroy {

  html = '';
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  frontPagePhoto: Blob;

  editorForm: FormGroup = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  detailsForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required()),
    author: new FormControl('', Validators.required())
  });

  ngOnInit(): void {
    this.editor = new Editor({
      keyboardShortcuts: true,
      history: true
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onImageInput(event): void {
    this.frontPagePhoto = event.target.files[0];
  }

}
