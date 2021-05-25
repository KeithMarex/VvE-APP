import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/shared/models/comment.model';
import { Image } from 'src/shared/models/image.model';
import { Tag } from 'src/shared/models/tag.model';
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
    private Dao: Dao //TODO remove
  ) {}

  ngOnInit(): void {
    this.Dao.forceLogin(); //TODO remove
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
          'filler assignee', //FIXME
          incomingTicket.status,
          incomingTicket.comments,
          [new Tag()], //FIXME
          incomingTicket.createdAt,
          incomingTicket.updatedAt
        ))
      })
    });
  }

}