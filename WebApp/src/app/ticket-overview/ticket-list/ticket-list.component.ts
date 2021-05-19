import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [new Ticket('1', 'Test titel', 'Test description', '5', '3', 'In behandeling', new Date(), new Date()), new Ticket('1', 'Test titel', 'Test description', '5', '3', 'In behandeling', new Date(), new Date())];
  

  constructor() { }

  ngOnInit(): void {
  }

}
