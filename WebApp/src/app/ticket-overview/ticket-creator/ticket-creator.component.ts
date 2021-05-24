import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TicketDao } from 'src/shared/services/ticket-dao.service';

@Component({
  selector: 'app-ticket-creator',
  templateUrl: './ticket-creator.component.html',
  styleUrls: ['./ticket-creator.component.scss']
})
export class TicketCreatorComponent implements OnInit {

  constructor(private ticketDao: TicketDao) { }

  ngOnInit(): void {
  }

  onCreateTicket(form: NgForm) {
    const formValues = form.value;
    
    //TODO send post request with formValues
  }

}
