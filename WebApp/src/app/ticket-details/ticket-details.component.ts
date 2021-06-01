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
  ticketCreator: string;
  private ticketSubscription: Subscription;
  private creatorSubscription: Subscription; // FIXME get entire user model instead?

  constructor(private ticketEditorService: TicketEditorService, private router: Router) { }

  ngOnInit(): void {
    this.getActiveTicket();
    this.getCreatorName();
  }

  getActiveTicket(): void {
    this.ticketSubscription = this.ticketEditorService.selectedTicket.subscribe(ticketToEdit => {
      if (!ticketToEdit) {
        // FIXME send GET request with url param as failsafe
        this.router.navigate(['ticket-overview']);
      }
      this.ticket = ticketToEdit;
    });
  }

  getCreatorName(): void {
    this.creatorSubscription = this.ticketEditorService.ticketCreator.subscribe(creator => {
      if (creator) {
        this.ticketCreator = creator;
      }
    });
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe();
    this.creatorSubscription.unsubscribe();
  }

}
