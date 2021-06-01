import { stringify } from '@angular/compiler/src/util';
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
  private creatorSubscription: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router) { }

  ngOnInit(): void {
    this.getActiveTicket();
    this.getCreatorName();
  }

  getActiveTicket() {
    const storedTicket = sessionStorage.getItem('ticket');

    if (storedTicket) {
      const parsedTicket: Ticket =  JSON.parse(storedTicket)

      this.ticket = parsedTicket;
    }
    else {
      this.ticketSubscription = this.ticketEditorService.selectedTicket.subscribe(ticketToEdit => {
        if (!ticketToEdit) {
          this.router.navigate(['ticket-overview']);
        }
        this.ticket = ticketToEdit;
        sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
      })
    }
  }

  getCreatorName() {
    const storedCreator = sessionStorage.getItem('creator');

    if (storedCreator) {
      this.ticketCreator = storedCreator;
    }
    else {
      this.creatorSubscription = this.ticketEditorService.ticketCreator.subscribe(creator => {
        if (creator) {
          this.ticketCreator = creator;
          sessionStorage.setItem('creator', this.ticketCreator);
        }
      })
    }
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
    if (this.ticketSubscription)
    {
      this.ticketSubscription.unsubscribe();
    }

    if (this.creatorSubscription) {
      this.creatorSubscription.unsubscribe();
    }
  }

}
