import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/shared/models/ticket.model';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;
  shortDesc = '';
  creatorName = '';

  constructor(private userDao: UserDao, private router: Router, private ticketEditorService: TicketEditorService) { }

  ngOnInit(): void {
    if (this.ticket.description.length > 180) {
      this.shortDesc = this.ticket.description.slice(0, 180);
    }

    this.getTicketUsername();
  }

  getTicketUsername() {
    this.userDao.getUserById(this.ticket.creator)
    .subscribe(user => {
      this.creatorName = user.firstname;
    })
  }

  onEdit() {
    this.ticketEditorService.selectedTicket.next(this.ticket);
    this.router.navigate(['ticket-details/' + this.ticket._id]);
  }
}
