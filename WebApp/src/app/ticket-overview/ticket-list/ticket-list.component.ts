import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/shared/models/comment.model';
import { Image } from 'src/shared/models/image.model';
import { Tag } from 'src/shared/models/tag.model';
import { Ticket } from 'src/shared/models/ticket.model';
import { Dao } from 'src/shared/services/dao.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = 
  [new Ticket('1', 'Test titel', 'Test description', [new Image()], '5', '3', 'In behandeling', [new Comment()], [new Tag()], new Date(), new Date()),
  new Ticket('1', 'Test titel', 'Test description', [new Image()], '5', '3', 'In behandeling', [new Comment()], [new Tag()], new Date(), new Date()),
  new Ticket('1', 'Test titel', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', [new Image()], '5', '3', 'In behandeling', [], [new Tag()], new Date(), new Date()),
  new Ticket('1', 'Test titel', 'Test description', [new Image()], '5', '3', 'In behandeling', [new Comment()], [new Tag()], new Date(), new Date()),
  new Ticket('1', 'Test titel', 'Test description', [new Image()], '5', '3', 'In behandeling', [new Comment()], [new Tag()], new Date(), new Date()),
  new Ticket('1', 'Test titel', 'Test description', [new Image()], '5', '3', 'In behandeling', [new Comment()], [new Tag()], new Date(), new Date()),
  new Ticket('1', 'Test titel', 'Test description', [new Image()], '5', '3', 'In behandeling', [new Comment()], [new Tag()], new Date(), new Date())]; //TODO remove and replace with real tickets
  

  constructor(
    private dao: Dao
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.dao.getAllTickets();
    // .subscribe((incomingTickets: Ticket[]) => {
    //   incomingTickets.forEach(incomingTicket => {
    //     this.tickets.push(new Ticket(
    //       incomingTicket._id,
    //       incomingTicket.title,
    //       incomingTicket.description,
    //       incomingTicket.images,
    //       incomingTicket.creator,
    //       'filler assignee', //FIXME
    //       incomingTicket.status,
    //       incomingTicket.comments,
    //       [new Tag()], //FIXME
    //       incomingTicket.createdAt,
    //       incomingTicket.updatedAt
    //     ))
    //   })
    // });
  }

}
