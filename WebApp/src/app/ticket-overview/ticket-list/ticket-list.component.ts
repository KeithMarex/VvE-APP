import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { sortBy } from 'sort-by-typescript';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[];

  constructor(
    private ticketDao: TicketDao,
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketDao.getAllTickets()
    .subscribe((incomingTickets: Ticket[]) => {
      this.tickets = incomingTickets;
      this.tickets.sort(sortBy('-status'));
    });
  }

  onChangeSort(sortProperty: string): void {
    this.tickets = this.tickets.sort(sortBy('-' + sortProperty));
  }
}
