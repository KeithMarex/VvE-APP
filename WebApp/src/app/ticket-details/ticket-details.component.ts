import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/shared/models/ticket.model';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { TicketEditorService } from 'src/shared/services/ticket-editor.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket: Ticket;
  ticketCreator: string;
  private ticketIdSub: Subscription;
  private creatorSub: Subscription;

  constructor(private ticketEditorService: TicketEditorService, private router: Router, private ticketDao: TicketDao) { }

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
      this.ticketIdSub = this.ticketEditorService.selectedTicketId.subscribe(ticketId => {
        if (!ticketId) {
          this.router.navigate(['ticket-overview']);
        }
        else {
          this.requestTicket(ticketId);
        }
      })
    }
  }

  requestTicket(id: string) {
    this.ticketDao.getTicketById(id)
    .subscribe(response => {
      this.ticket = response;
      sessionStorage.setItem('ticket', JSON.stringify(this.ticket));
    });
  }

  getCreatorName() {
    const storedCreator = sessionStorage.getItem('creator');

    if (storedCreator) {
      this.ticketCreator = storedCreator;
    }
    else {
      this.creatorSub = this.ticketEditorService.ticketCreator.subscribe(creator => {
        if (creator) {
          this.ticketCreator = creator;
          sessionStorage.setItem('creator', this.ticketCreator);
        }
      })
    }
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
    if (this.ticketIdSub)
    {
      this.ticketIdSub.unsubscribe();
    }

    if (this.creatorSub) {
      this.creatorSub.unsubscribe();
    }
  }

}
