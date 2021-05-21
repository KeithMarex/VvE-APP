import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss']
})
export class TicketOverviewComponent implements OnInit {
  creatingTicket = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.creatingTicket = true;
  }

  onClose() {
    this.creatingTicket = false;
  }

}
