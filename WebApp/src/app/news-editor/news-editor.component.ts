import { ActivatedRoute } from '@angular/router';
import { NewsDao } from '../../shared/services/news-dao.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsEditorComponent implements OnInit, OnDestroy {

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

  thumbnail: Blob;
  error: any = {
    isError: false,
    message: "No message given"
  };
  isSucces: boolean = false;
  isLoading: boolean = false;
  isNew: boolean = true;
  _id: string;

  editorForm: FormGroup = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  detailsForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required()),
    author: new FormControl('', Validators.required())
  });

  constructor(private newsDao: NewsDao, private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.editor = new Editor({
      keyboardShortcuts: true,
      history: true
    });
    this.route.params.subscribe(
      params => {
        if (params['id'] !== 'create') {
          this.isNew = false;
          this._id = params["id"];
          this.initzializeNews(params['id']);
        }
      }
    )
  }

  initzializeNews(id: String) {
    this.newsDao.getNewsItem(id).subscribe(
      response => {
        this.editorForm.controls["editorContent"].setValue(response.content);
        this.detailsForm.controls["title"].setValue(response.title);
        this.detailsForm.controls["author"].setValue(response.author);
        this.getBase64FromUrl(response.thumbnail["image_url"]).then(
          blob => {
            blob["name"] = response.thumbnail["name"];
            this.thumbnail = blob;
          });
      },
      err => {
        this.error.message = "SERVER ERROR: Er was een probleem met het ophalen van het nieuws artikel." + err.message;
        this.error.isError = true;
      }
    )
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  setThumbnail(event): void {
    this.thumbnail = event.target.files[0];
  }

  deleteThumbnail(): void {
    this.thumbnail = null;
  }

  closeSuccesMessage(): void {
    this.isSucces = false;
  }

  onSubmit(): void {
    this.error.isError = false;
    this.isSucces = false;
    this.isLoading = true;

    if (!(this.editorForm.valid && this.detailsForm.valid && this.thumbnail)) {
      this.setErrorMessage();
      this.error.isError = true;
      this.isLoading = false;
      return;
    }

    const formData = this.createFormData();

    if (this.isNew) {
      this.createNews(formData);
    } else {
      this.updateNews(formData);
    }

  }

  createNews(formData): void {
    this.newsDao.createNewsItem(formData).subscribe(
      () => {
        this.isSucces = true;
        this.isLoading = false;
      },
      err => {
        this.error.message = err.message;
        this.error.isError = true;
        this.isLoading = false;
      }
    )
  }

  updateNews(formData): void {
    this.newsDao.updateNewsItem(formData, this._id).subscribe(
      () => {
        this.isSucces = true;
        this.isLoading = false;
      },
      err => {
        this.error.message = err.error.message;
        this.error.isError = true;
        this.isLoading = false;
      }
    )
  }


  setErrorMessage(): void {
    if (!this.editorForm.valid) {
      this.error.message = "Er is geen nieuwsartikel geschreven";
    } else if (!this.detailsForm.valid) {
      this.error.message = "Titel of auteur ontbreekt";
    } else if (!this.thumbnail) {
      this.error.message = "Voorpagina foto ontbreekt"
    }
  }

  createFormData(): FormData {
    const formData = new FormData();
    formData.append("title", this.detailsForm.controls["title"].value);
    formData.append("author", this.detailsForm.controls["author"].value);
    formData.append("content", this.editorForm.controls["editorContent"].value);
    formData.append("file1" , this.thumbnail, this.thumbnail["name"]);
    return formData;
  }

  doesTitleExist(): boolean {
    return this.detailsForm.controls["title"].value
  }

  getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    return data.blob();
  }
}
