import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tag } from 'src/shared/models/tag.model';
import { User } from 'src/shared/models/user.model';
import { TagDao } from 'src/shared/services/tag-dao.service';
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
  organizationTags: Tag[];
  errorMessage: string;

  constructor(private ticketDao: TicketDao, private userDao: UserDao, private tagDao: TagDao) { }

  ngOnInit(): void {
    this.getOrganizationAdmins();
    this.getOrganizationTags();
  }

  onCreateTicket(form: NgForm) {
    const formValues = form.value;
    const mForm = new FormData();

    mForm.append('title', formValues.title);
    mForm.append('description', formValues.description);
    if (formValues.assignee) {
      mForm.append('assignee', formValues.assignee);
    }
    mForm.append('status', this.formatStatus(formValues.status));

    this.ticketDao.createTicket(mForm)
    .subscribe(
      res => {
      this.ticketCreated.emit();
      }, 
      errorRes => {
        let incomingErrorMessage = errorRes.error.message;
        if (incomingErrorMessage) {
          this.errorMessage = errorRes.error.message;
        } else {
          this.errorMessage = 'Er is een onbekende error opgetreden';
        }
      }
    );
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

  getOrganizationAdmins() {
    this.userDao.getAdminsByOrganization()
    .subscribe(responseUsers => {
      this.organizationMembers = responseUsers;
    })
  }

  getOrganizationTags() {
    this.tagDao.getAllTags()
    .subscribe(responseTags => {
      this.organizationTags = responseTags;
    })
  }

}
