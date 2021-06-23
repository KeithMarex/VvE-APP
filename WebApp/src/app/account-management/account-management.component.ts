import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  creatingUser = false;
  importingUsers = false;
  importCsv: File;
  file: Blob;
  reader: FileReader = new FileReader()
  readFile = this.reader.result;

  constructor() { }

  ngOnInit(): void {
  }

  onAddUser() {
    this.creatingUser = true;
  }

  onImportUsers(form: any) {
    this.importCsv = form;
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
