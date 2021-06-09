import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from 'src/shared/models/tag.model';
import { Ticket } from 'src/shared/models/ticket.model';
import { User } from 'src/shared/models/user.model';
import { TagDao } from 'src/shared/services/tag-dao.service';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  ticketCreator: User;
  selectedStatus: string;
  originalStatus: string;
  statuses: string[] = ["PENDING", "HANDLING", "HANDLED"];
  selectedTag: Tag;
  originalTag: Tag;
  tags: Tag[] = [];
  selectedAssignee: User;
  originalAssignee: User;
  assignees: User[] = [];
  errorMessage: string;

  private ticketIdSub: Subscription;
  private creatorSub: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router, private tagDao: TagDao,
    private userDao: UserDao, private ticketDao: TicketDao) { }

  ngOnInit(): void {
    this.getActiveTicket();
    this.getTicketCreator();
    this.getTags();
    this.getSelectedStatus();
    this.getAssignees();
    this.getSelectedAssignee();
  }

  getActiveTicket() {
    const storedTicket = sessionStorage.getItem('ticket');

    if (storedTicket) {
      this.ticket =  JSON.parse(storedTicket);
    }
    else {
      this.ticketIdSub = this.ticketEditorService.selectedTicketId.subscribe(ticketId => {
        if (!ticketId) {
          this.router.navigate(['ticket-overview']);
        }
        else {
          this.ticketDao.getTicketById(ticketId)
          .subscribe(ticketRes => 
            {
              this.ticket = ticketRes;
              sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
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
    let unnamedTag: Tag = { name: "Nog niet toegewezen" }
    this.tags.push(unnamedTag);
    if (this.ticket && this.ticket.tag) {
      this.selectedTag = this.ticket.tag;
      this.originalTag = this.ticket.tag;
    }
    else {
      this.selectedTag = unnamedTag;
      this.originalTag = unnamedTag;
    }
  }

  getSelectedStatus(): void {
    if (this.ticket && this.ticket.status) {
      this.selectedStatus = this.ticket.status;
      this.originalStatus = this.ticket.status;
    }
    else {
      this.selectedStatus = this.statuses[0];
      this.originalStatus = this.statuses[0];
    }
  }

  getAssignees(): void {
    let unnamedAssignee: User = { firstname: "Nog niet", lastname: "toegewezen" }

    this.userDao.getUsersByOrganization()
      .subscribe((incomingUsers: User[]) => {
        incomingUsers.forEach(incomingUser => {
          if (incomingUser.role == 'admin') {
            this.assignees.push(incomingUser);
          }
        })
        this.assignees.push(unnamedAssignee);
      });
  }

  getSelectedAssignee(): void {
    let assignedUserId: string;
    let unnamedAssignee: User = { firstname: "Nog niet", lastname: "toegewezen" }
    if (this.ticket && this.ticket.assignee) {
      this.userDao.getUserById(this.ticket.assignee).subscribe(Response => {
        this.selectedAssignee = Response;
        this.originalAssignee = Response;
      });
    }
    else {
      this.selectedAssignee = unnamedAssignee;
      this.originalAssignee = unnamedAssignee;
    }
  }

  submitInformation(): void {
    const mForm = new FormData();

    if (this.selectedStatus != this.originalStatus) {
      mForm.append('status', this.selectedStatus);
    }
    if (this.selectedTag != this.originalTag) {
      mForm.append('assignee', this.selectedTag._id);
    }
    if (this.selectedAssignee != this.originalAssignee) {
      mForm.append('assignee', this.selectedAssignee._id);
    }
    
    // this.ticketDao.updateTicket(this.ticket._id, mForm)
    // .subscribe(
    //   res => {
    //     this.originalAssignee = this.selectedAssignee;
    //     this.originalStatus = this.selectedStatus;
    //     this.originalTag = this.selectedTag;
    //   }, 
    //   errorRes => {
    //     let incomingErrorMessage = errorRes.error.message;
    //     if (incomingErrorMessage) {
    //       this.errorMessage = errorRes.error.message;
    //     } else {
    //       this.errorMessage = 'Er is een onbekende error opgetreden';
    //     }
    //   }
    // );
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
