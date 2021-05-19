import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;

  constructor() { }

  ngOnInit(): void {
  }

}
