import { Component, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

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
  error: any = {
    isError: false,
    message: "No message given"
  };
  isLoading: boolean = false;

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

  deleteFrontPagePhoto(): void {
    this.frontPagePhoto = null;
  }

  onSubmit(): void {
    // If input is validated
    this.error.isError = false;
    if (!(this.editorForm.valid && this.detailsForm.valid && this.frontPagePhoto)) {
      this.error.isError = true;
      this.setErrorMessage();
    }

    const formData = new FormData();
    formData.append("title", this.detailsForm.controls["title"].value);
    formData.append("author", this.detailsForm.controls["author"].value);
    formData.append("content", this.editorForm.controls["editorContent"].value);
    formData.append("file1" , this.frontPagePhoto);
    // if this is existing thingy do if with other request "Update"
    // if object id === null

    // Do request
    // Show error when there is a mistake

  }

  setErrorMessage(): void {
    if (!this.editorForm.valid) {
      this.error.message = "Er is geen nieuwsartikel geschreven";
    } else if (!this.detailsForm.value) {
      this.error.message = "Titel of auteur ontbreekt";
    } else if (!this.frontPagePhoto) {
      this.error.message = "Voorpagina foto ontbreekt"
    }
  }
}
