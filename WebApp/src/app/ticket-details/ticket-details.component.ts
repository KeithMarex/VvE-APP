import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Ticket } from 'src/shared/models/ticket.model';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;

  constructor(private ticketEditorService: TicketEditorService) { }

  ngOnInit(): void {
    this.ticketEditorService.selectedTicket.subscribe(ticketToEdit => {
      this.ticket = ticketToEdit;
      console.log("Received ticket to edit in details component!");
    })
  }


}
