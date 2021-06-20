import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment } from 'src/shared/models/comment.model';

@Component({
  selector: 'app-logged-in-user-ticket-comment',
  templateUrl: './logged-in-user-ticket-comment.component.html',
  styleUrls: ['./logged-in-user-ticket-comment.component.scss']
})
export class LoggedInUserTicketCommentComponent implements OnInit {
    @Input() comment: Comment;

  constructor() { }

  ngOnInit(): void {
  } 
}