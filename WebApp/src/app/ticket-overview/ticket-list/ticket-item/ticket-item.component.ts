import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;
  shortDesc = '';

  constructor() { }

  ngOnInit(): void {
    if (this.ticket.description.length > 180) {
      this.shortDesc = this.ticket.description.slice(0, 180);
      console.log("Using shortdesc");
    }
  }

}
