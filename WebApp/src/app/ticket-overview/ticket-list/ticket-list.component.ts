import { Component, OnInit } from '@angular/core';
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
  filteredTickets: Ticket[] = this.tickets;
  noFilteredTickets: boolean = false;

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

  onChangeFilter(filterTerm: string): void {
    this.noFilteredTickets = false;
    var ticketsWithFilterTerm: Ticket[] = [];

    var tickets = this.tickets;

    for (var i = 0; i < tickets.length; i++) {
      const ticketAsString = JSON.stringify(tickets[i]).toLowerCase(); // Fully stringify ticket object

      if (ticketAsString.includes(filterTerm.toLocaleLowerCase())) {
        ticketsWithFilterTerm.push(tickets[i]);
      }
    }

    if (ticketsWithFilterTerm.length > 0) {
      this.filteredTickets = ticketsWithFilterTerm;
    }
    else if (filterTerm.length == 0) {
      this.filteredTickets = this.tickets;
    }
    else {
      this.noFilteredTickets = true;
    }
  }
}
