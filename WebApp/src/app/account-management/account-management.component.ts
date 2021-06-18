import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  creatingUser = false;
  importingUsers = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddUser() {
    this.creatingUser = true;
  }

  onImportUsers() {
    this.importingUsers = true;
  }

  onCloseCreator() {
    this.creatingUser = false;
  }

  onCloseImport() {
    this.importingUsers = false;
  }

  onCreateUser() {
    this.creatingUser = false;
    window.location.reload();
  }

  onUsersImported() {
    this.importingUsers = false;
    window.location.reload();
  }

}
