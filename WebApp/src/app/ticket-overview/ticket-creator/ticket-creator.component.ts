import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TicketDao } from 'src/shared/services/ticket-dao.service';

@Component({
  selector: 'app-ticket-creator',
  templateUrl: './ticket-creator.component.html',
  styleUrls: ['./ticket-creator.component.scss']
})
export class TicketCreatorComponent implements OnInit {
  @Output() ticketCreated = new EventEmitter();

  constructor(private ticketDao: TicketDao) { }

  ngOnInit(): void {
  }

  onCreateTicket(form: NgForm) {
    const formValues = form.value;

    this.ticketDao.createTicket(
      {
        "title": formValues.title,
        "description": formValues.description,
        "creator": "60a69daf408255502dd4a948", //FIXME add ACTIVE user
        "status": this.formatStatus(formValues.status)
      }
    )
    .subscribe(res => {
      console.log(res);
      this.ticketCreated.emit();
    })
  }

  formatStatus(status: string): string {
    switch(status) {

      case "In afwachting":
        return "PENDING";

      case "In behandeling":
        return "HANDLING";

      case "Afgehandeld":
        return "HANDLED";

      default:
        return "PENDING";
    }
  }

}
