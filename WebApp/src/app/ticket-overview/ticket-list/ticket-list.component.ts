import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';
import { Dao } from 'src/shared/services/dao.service';
import { TicketDao } from 'src/shared/services/ticket-dao.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private ticketDao: TicketDao,
    private dao: Dao // TODO remove
  ) {}

  ngOnInit(): void {
    this.dao.forceLogin(); // TODO remove
    this.getTickets();
  }

  getTickets(): void {
    this.ticketDao.getAllTickets()
    .subscribe((incomingTickets: Ticket[]) => {
      incomingTickets.forEach(incomingTicket => {
        this.tickets.push(new Ticket(
          incomingTicket._id,
          incomingTicket.title,
          incomingTicket.description,
          incomingTicket.images,
          incomingTicket.creator,
          this.checkAssignee(incomingTicket.assignee),
          incomingTicket.status,
          incomingTicket.comments,
          incomingTicket.tag, // FIXME
          incomingTicket.createdAt,
          incomingTicket.updatedAt
        ));
      });
    });
  }

  checkAssignee(assignee: string): string {
    if (assignee) {
      return assignee;
    }
    else {
      return 'Niet toegewezen';
    }
  }

}
