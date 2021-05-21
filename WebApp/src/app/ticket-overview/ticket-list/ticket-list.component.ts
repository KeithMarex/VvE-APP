import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';
import { Dao } from 'src/shared/services/dao.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [new Ticket('1', 'Test titel', 'Test description', '5', '3', 'In behandeling', new Date(), new Date()), new Ticket('1', 'Test titel', 'Test description', '5', '3', 'In behandeling', new Date(), new Date())];
  

  constructor(
    // private dao: Dao
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    // this.dao.sendGetRequest('ticket');
    //TODO map response data as tickets array
  }

}
