import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketListComponent } from './ticket-list/ticket-list.component';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss']
})
export class TicketOverviewComponent implements OnInit {
  @ViewChild('ticketList') listCmp: TicketListComponent;
  creatingTicket = false;

  constructor() { }

  ngOnInit(): void {}

  onAdd(): void {
    this.creatingTicket = true;
  }

  onClose(): void {
    this.creatingTicket = false;
  }

  onCreateTicket(): void {
    this.creatingTicket = false;
    window.location.reload();
  }

  onChangeSort(sortProperty: string): void {
    this.listCmp.onChangeSort(sortProperty);
  }

  searchTermChanged(newTerm: string): void {
    console.log(newTerm);
  }

}
