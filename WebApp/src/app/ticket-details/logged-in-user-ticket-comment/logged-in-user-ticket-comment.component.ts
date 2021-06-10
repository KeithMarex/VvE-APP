import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { UserDao } from 'src/shared/services/user-dao.service';
import { Comment } from 'src/shared/models/comment.model';
import { Image } from 'src/shared/models/image.model';
import { NgForm } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Component({
  selector: 'app-logged-in-user-ticket-comment',
  templateUrl: './logged-in-user-ticket-comment.component.html',
  styleUrls: ['./logged-in-user-ticket-comment.component.scss']
})
export class LoggedInUserTicketCommentComponent implements OnInit, OnDestroy {
    @Input() comment: Comment;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.comment.images[0].image_url);
  }

  ngOnDestroy(): void {
  }
}