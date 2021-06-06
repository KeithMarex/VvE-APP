import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/shared/models/ticket.model';
import { User } from 'src/shared/models/user.model';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;
  creator: User;
  assignee: User;

  constructor(private userDao: UserDao, private router: Router, private ticketEditorService: TicketEditorService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    var creatorId = this.ticket.creator;
    var assigneeId = this.ticket.assignee;

    if (creatorId) {
      this.userDao.getUserById(creatorId)
      .subscribe(userRes => 
        { 
          this.creator = userRes 
        }
      );
    }
    if (assigneeId) {
      this.userDao.getUserById(assigneeId)
      .subscribe(userRes => 
        {
          this.assignee = userRes;
        }
      )
    }
  }

  onEdit() {
    this.ticketEditorService.selectedTicketId.next(this.ticket._id);
    this.ticketEditorService.ticketCreator.next(this.creator.firstname); //FIXME pass on full User
    this.router.navigate(['ticket-details/' + this.ticket._id]);
  }
}
