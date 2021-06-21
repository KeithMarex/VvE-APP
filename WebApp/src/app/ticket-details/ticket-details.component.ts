import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from 'src/shared/models/tag.model';
import { Ticket } from 'src/shared/models/ticket.model';
import { User } from 'src/shared/models/user.model';
import { TagDao } from 'src/shared/services/tag-dao.service';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { UserDao } from 'src/shared/services/user-dao.service';
import { Comment } from 'src/shared/models/comment.model';
import { Image } from 'src/shared/models/image.model';
import { NgForm } from "@angular/forms";
import { CommentDao } from 'src/shared/services/comment-dao.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  ticketCreator: User;
  selectedStatus: string;
  statuses: string[] = ["PENDING", "HANDLING", "HANDLED"];
  selectedTag: Tag;
  tags: Tag[] = [];
  selectedAssignee: string;
  assignees: string[] = [];
  inputCommentText: string;
  inputCommentImage: Blob;
  commentImages: Blob[] = [];
  comments: Comment[];

  private ticketIdSub: Subscription;
  private creatorSub: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router, private tagDao: TagDao,
    private userDao: UserDao, private ticketDao: TicketDao, private dataStorageService: DataStorageService, private commentDao: CommentDao) { }

  ngOnInit(): void {
    this.getActiveTicket();
    this.getTicketCreator();
    this.getTags();
    this.getSelectedStatus();
    this.getAssignees();
  }

  getActiveTicket() {
    const storedTicket = sessionStorage.getItem('ticket');

    if (storedTicket) {
      this.ticket =  JSON.parse(storedTicket);
      this.comments = this.ticket.comments;
    }
    else {
      this.ticketIdSub = this.ticketEditorService.selectedTicketId.subscribe(ticketId => {
        if (!ticketId) {
          this.router.navigate(['ticket-overview']); // Failsafe
        }
        else {
          this.ticketDao.getTicketById(ticketId)
          .subscribe(ticketRes => 
            {
              this.ticket = ticketRes;
              sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
              this.comments = this.ticket.comments;
            }
          );
        }
      })
    }
  }

  getTicketCreator() {
    const storedCreator = sessionStorage.getItem('creator');

    if (storedCreator) {
      this.ticketCreator = JSON.parse(storedCreator);
    }
    else {
      this.creatorSub = this.ticketEditorService.ticketCreator.subscribe(creator => {
        if (creator) {
          this.ticketCreator = creator;
          sessionStorage.setItem('creator', JSON.stringify(this.ticketCreator));
        }
      })
    }
  }

  getTags(): void {
    this.tagDao.getAllTags()
    .subscribe((incomingtags: Tag[]) => {
      this.tags = incomingtags;
      })
      this.getSelectedTag();
  }

  getSelectedTag(): void {
    if (this.ticket && this.ticket.tag) {
      this.selectedTag = this.ticket.tag;
    }
    else {
      this.selectedTag = this.tags[0];
    }
  }

  getSelectedStatus(): void {
    if (this.ticket && this.ticket.status) {
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
    const formData = new FormData();
    this.inputCommentText = form.value.inputCommentText;
    console.log(this.inputCommentText);
    // console.log(this.inputCommentText);
    
    this.commentImages.forEach((image, index) => { 
      // let imgBlob = new Blob()
      formData.append(`file${index + 1}`, image);
    });
    formData.append("comment", this.inputCommentText);
    formData.append("ticketID", this.ticket._id);

    this.commentDao.createComment(formData).subscribe(Response => console.log(Response));
  }

  handleFileInput(target: any): void {
		this.inputCommentImage = target.files.item(0);
    this.commentImages.push(this.inputCommentImage);
    this.inputCommentImage = undefined;
    target.value = "";
	}

  deleteImage(Image): void {
    this.commentImages.splice(this.commentImages.indexOf(Image),1);
  }

  commentIsFromUser(comment: Comment): boolean {
    if (comment.user) {
      return comment.user._id == this.dataStorageService.getLoggedInUserId();
    }
    else {
      return false;
    }
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
    if (this.ticketIdSub)
    {
      this.ticketIdSub.unsubscribe();
    }

    if (this.creatorSub) {
      this.creatorSub.unsubscribe();
    }
  }

}
