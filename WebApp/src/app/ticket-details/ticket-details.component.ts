import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from 'src/shared/models/tag.model';
import { Ticket } from 'src/shared/models/ticket.model';
import { User } from 'src/shared/models/user.model';
import { TagDao } from 'src/shared/services/tag-dao.service';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { UserDao } from 'src/shared/services/user-dao.service';
import { Comment } from 'src/shared/models/comment.model';
import { Image } from 'src/shared/models/image.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  ticketCreator: string;
  selectedStatus: string;
  statuses: string[] = ["PENDING", "HANDLING", "HANDLED"];
  selectedTag: Tag;
  tags: Tag[] = [];
  selectedAssignee: string;
  assignees: string[] = [];
  inputCommentText: string;
  inputCommentImage: File;
  commentImages: File[];
  comments: Comment[];

  private ticketSubscription: Subscription;
  private creatorSubscription: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router, private tagDao: TagDao,
    private userDao: UserDao) { }

  ngOnInit(): void {
    this.getActiveTicket();
    this.getCreatorName();
    this.getTags();
    this.getSelectedStatus();
    this.getAssignees();
  }

  getActiveTicket() {
    const storedTicket = sessionStorage.getItem('ticket');

    if (storedTicket) {
      const parsedTicket: Ticket =  JSON.parse(storedTicket)

      this.ticket = parsedTicket;
    }
    else {
      this.ticketSubscription = this.ticketEditorService.selectedTicket.subscribe(ticketToEdit => {
        if (!ticketToEdit) {
          this.router.navigate(['ticket-overview']);
        }
        this.ticket = ticketToEdit;
        sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
      })
    }
    this.comments = this.ticket.comments;
    console.log(this.ticket);
  }

  getCreatorName() {
    const storedCreator = sessionStorage.getItem('creator');

    if (storedCreator) {
      this.ticketCreator = storedCreator;
    }
    else {
      this.creatorSubscription = this.ticketEditorService.ticketCreator.subscribe(creator => {
        if (creator) {
          this.ticketCreator = creator;
          sessionStorage.setItem('creator', this.ticketCreator);
        }
      })
    }
  }

  getTags(): void {
    this.tagDao.getAllTags()
    .subscribe((incomingtags: Tag[]) => {
      incomingtags.forEach(incomingTag => {
        this.tags.push(new Tag(
          incomingTag._id,
          incomingTag.name,
          incomingTag.color,
          incomingTag.createdAt,
          incomingTag.updatedAt
        ))
      })
      this.getSelectedTag();
    });
  }

  getSelectedTag(): void {
    if (this.ticket.tag) {
      this.selectedTag = this.ticket.tag;
    }
    else {
      this.selectedTag = this.tags[0];
    }
  }

  getSelectedStatus(): void {
    if (this.ticket.status) {
      this.selectedStatus = this.ticket.status;
    }
    else {
      this.selectedStatus = this.statuses[0];
    }
  }

  getAssignees(): void {
    this.selectedAssignee = "Nog niet toegewezen";

    this.userDao.getUsersByOrganization()
      .subscribe((incomingUsers: User[]) => {
        incomingUsers.forEach(incomingUser => {
          if (incomingUser.role == 'admin') {
            this.assignees.push(incomingUser.firstname + " " + incomingUser.lastname);
          }
        })
        this.assignees.push("Nog niet toegewezen");
      });
  }

  submitComment(form: NgForm): void {
    this.inputCommentText = form.value.inputCommentText;
    // console.log(this.inputCommentText);
  }

  handleFileInput(target: any): void {

		this.inputCommentImage = target.files;
    console.log(this.inputCommentImage);
	}

  ngOnDestroy(): void {
    sessionStorage.clear();
    if (this.ticketSubscription)
    {
      this.ticketSubscription.unsubscribe();
    }

    if (this.creatorSubscription) {
      this.creatorSubscription.unsubscribe();
    }
  }

}
