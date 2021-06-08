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
  statuses: string[] = ["PENDING", "HANDLING", "HANDLED"];
  selectedTag: Tag;
  tags: Tag[] = [];
  selectedAssignee: string;
  assignees: string[] = [];

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

  submitInformation(): void {
    console.log(this.selectedAssignee);
    console.log(this.selectedStatus);
    console.log(this.selectedTag);
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
