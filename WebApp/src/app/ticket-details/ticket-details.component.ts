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
import { FormControl, NgForm } from "@angular/forms";
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
  selectedAssignee: User;
  assignees: User[] = [];
  
  commentImages: Blob[] = [];
  comments: Comment[];
  commentText = new FormControl('');
  
  commentErrorMessage: string;
  infoErrorMessage: string;
  isCommentError = false;
  isInfoError = false;

  private ticketIdSub: Subscription;
  private creatorSub: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router, private tagDao: TagDao,
    private userDao: UserDao, private ticketDao: TicketDao, private dataStorageService: DataStorageService, private commentDao: CommentDao) { }

  ngOnInit(): void {
    this.getActiveTicket();
  }

  getActiveTicket() {
    const storedTicket = sessionStorage.getItem('ticket');
    if (storedTicket) {
      this.ticket =  JSON.parse(storedTicket);
      this.comments = this.ticket.comments;
      this.getSelectedInformation();
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
              this.getSelectedInformation();
            }
          );
        }
      })
    }
  }

  getSelectedInformation(): void {
    this.getAssignees();
    this.getTags();
    this.getStatus();
  }

  getTags(): void {
    this.tagDao.getAllTags()
    .subscribe((incomingtags: Tag[]) => {
      this.tags = incomingtags;
      })

      if (this.ticket.tag) {
        this.selectedTag = this.ticket.tag;
      }
      else {
        let unnamedTag: Tag = { name: "Nog niet toegewezen" }
        this.selectedTag = unnamedTag;
      }
  }

  getAssignees(): void {

    this.userDao.getUsersByOrganization()
      .subscribe((incomingUsers: User[]) => {
        incomingUsers.forEach(incomingUser => {
          if (incomingUser.role == 'admin') {
            this.assignees.push(incomingUser);
          }
        })
      });

      if (this.ticket.assignee) {
        this.selectedAssignee = this.ticket.assignee;
      }
      else {
        let unnamedAssignee: User = { firstname: "Nog niet", lastname: "toegewezen" }
        this.selectedAssignee = unnamedAssignee;
      }
  }

  getStatus(): void {
    if (this.ticket.status) {
      this.selectedStatus = this.ticket.status;
    }
    else {
      this.selectedStatus = this.statuses[0];
    }
  }

  submitTag(): void {
    if (this.selectedTag) {
      var multiForm = {"tag": this.selectedTag._id};
      this.submitInformation(multiForm);
    }
  }

  submitStatus(): void {
    var multiForm = {"status": this.selectedStatus};
    this.submitInformation(multiForm);
  }

  submitAssignee(): void {
    if (this.selectedAssignee) {
      var multiForm = {"assignee": this.selectedAssignee._id};
      this.submitInformation(multiForm);
    }
  }

  submitInformation(body: unknown): void {
    this.isInfoError = false;
    
    this.ticketDao.updateTicket(this.ticket._id, body).subscribe(Response => {
      this.ticketDao.getTicketById(this.ticket._id)
      .subscribe(ticketRes => {
        this.ticket = ticketRes;
        sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
      });
    }, 
    errorRes => {
      let incomingErrorMessage = errorRes.error.message;
      if (incomingErrorMessage) {
        this.infoErrorMessage = errorRes.error.message;
        this.isInfoError = true;
      }
      else {
        this.infoErrorMessage = 'Er is een onbekende error opgetreden';
        this.isInfoError = true;
      }
    });
  }

  submitComment(form: NgForm): void {
    if (!this.commentText.value) {
      this.isCommentError = true;
      this.commentErrorMessage = "Het bericht mag niet leeg zijn";
      return;
    }
    else {
      this.isCommentError = false;
      this.commentErrorMessage;
    }

    const formData = new FormData();

    this.commentImages.forEach((image, index) => {
      formData.append(`file` + index+1 , image)
    })

    formData.append("comment", this.commentText.value);
    formData.append("ticketID", this.ticket._id);    

    this.commentDao.createComment(formData).subscribe(Response => {
      this.commentImages = [];
      this.commentText.setValue('');
      this.ticketDao.getTicketById(this.ticket._id)
      .subscribe(ticketRes => {
        this.ticket = ticketRes;
        sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
        this.comments = this.ticket.comments;
      });
    },
    errorRes => {
      let incomingErrorMessage = errorRes.error.message;
      if (incomingErrorMessage) {
        this.isCommentError = true;
        this.commentErrorMessage = 'Er is een onbekende error opgetreden';
      }
      else {
        this.isCommentError = true;
        this.commentErrorMessage = 'Er is een onbekende error opgetreden';
      }
    });
  }

  handleFileInput(target: any): void {
    this.commentImages.push(target.files[0]);
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

  sliceImageName(name: string): string {
    if (name.length < 15) {
      return name;
    }
    else {
      return name.slice(0,14) + '...';
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
