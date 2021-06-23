import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onImportUsers(form: NgForm) {
    // this.importCsv = form;
    var file    = new Blob(form.value);
    console.log(form)
    this.reader.readAsText(file);
    
    // this.importingUsers = true;
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
