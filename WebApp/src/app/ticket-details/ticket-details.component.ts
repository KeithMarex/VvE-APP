import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/shared/models/ticket.model';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  private ticketSubscription: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router) { }

  ngOnInit(): void {
    this.getActiveTicket();
  }

  getActiveTicket() {
    this.ticketSubscription = this.ticketEditorService.selectedTicket.subscribe(ticketToEdit => {
      if (!ticketToEdit) {
        //TODO send GET request with url param as failsafe
        this.router.navigate(['ticket-overview']); //FIXME remove
      }
      this.ticket = ticketToEdit;
    })
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe();
  }

}
