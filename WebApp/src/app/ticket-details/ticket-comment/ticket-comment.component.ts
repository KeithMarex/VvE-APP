import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment } from 'src/shared/models/comment.model';

@Component({
  selector: 'app-ticket-comment',
  templateUrl: './ticket-comment.component.html',
  styleUrls: ['./ticket-comment.component.scss']
})
export class TicketCommentComponent implements OnInit {
    @Input() comment: Comment;

  constructor() { }

  ngOnInit(): void {
  }
}