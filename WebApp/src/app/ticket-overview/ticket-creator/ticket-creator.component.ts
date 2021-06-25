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
  organizationMembers: User[] = [new User(null, null, null, 'Niet', 'toegewezen', null, null)]; // Default user added so no assignee can be selected
  organizationTags: Tag[] = [new Tag(null, 'Geen tag geselecteerd', null, null, null)];
  statusOptions = ['In afwachting', 'In behandeling', 'Afgehandeld'];
  errorMessage: string;
  isLoading: boolean = false;

  selectedAssignee = this.organizationMembers[0];
  selectedTag = this.organizationTags[0];
  selectedStatus = this.statusOptions[0];

  constructor(private ticketDao: TicketDao, private userDao: UserDao, private tagDao: TagDao) { }

  ngOnInit(): void {
    this.getOrganizationAdmins();
    this.getOrganizationTags();
  }

  onCreateTicket(form: NgForm) {
    this.isLoading = true;
    const formValues = form.value;
    const mForm = new FormData();

    mForm.append('title', formValues.title);
    mForm.append('description', formValues.description);
    if (formValues.assignee._id) {
      mForm.append('assignee', formValues.assignee._id);
    }
    if (formValues.tag._id) { // Standard no tag contains no _id
      mForm.append('tag', formValues.tag._id);
    }
    mForm.append('status', this.formatStatus(formValues.status));

    this.ticketDao.createTicket(mForm)
    .subscribe(
      () => {
        this.isLoading = false;
        this.ticketCreated.emit();
      },
      errorRes => {
        this.isLoading = false;
        this.errorMessage = errorRes.statusText;
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
      this.populateMembers(responseUsers);
    });
  }

  populateMembers(newMembers: User[]) {
    for (var i = 0; i < newMembers.length; i++ ) {
      this.organizationMembers.push(newMembers[i]);
    }
  }

  getOrganizationTags() {
    this.tagDao.getAllTags()
    .subscribe(responseTags => {
      this.populateTags(responseTags);
    });
  }

  populateTags(newTags: Tag[]) {
    for (var i = 0; i < newTags.length; i++) {
      this.organizationTags.push(newTags[i]);
    }
  }

}
