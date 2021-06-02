import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/shared/models/user.model';
import { TicketDao } from 'src/shared/services/ticket-dao.service';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-ticket-creator',
  templateUrl: './ticket-creator.component.html',
  styleUrls: ['./ticket-creator.component.scss']
})
export class TicketCreatorComponent implements OnInit {
  @Output() ticketCreated = new EventEmitter();
  organizationMembers: User[];

  constructor(private ticketDao: TicketDao, private userDao: UserDao) { }

  ngOnInit(): void {
    this.fetchOrganizationUsers();
  }

  onCreateTicket(form: NgForm) {
    const formValues = form.value;
    const mForm = new FormData();

    mForm.append('title', formValues.title);
    mForm.append('description', formValues.description);
    if (formValues.assignee != 'unassigned') {
      mForm.append('assignee', formValues.assignee);
    }
    mForm.append('status', this.formatStatus(formValues.status));

    this.ticketDao.createTicket(mForm)
    .subscribe(response => {
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

  fetchOrganizationUsers() {
    this.userDao.getUsersByOrganization('60a51399c27149d22d8b717d') //TODO set to user's organization ID
    .subscribe(responseUsers => {
      this.organizationMembers = responseUsers;
    })
  }

}
