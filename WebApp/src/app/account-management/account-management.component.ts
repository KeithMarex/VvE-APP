import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  creatingUser = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddUser() {
    this.creatingUser = true;
  }

  onClose() {
    this.creatingUser = false;
  }

  onCreateUser() {
    this.creatingUser = false;
    window.location.reload();
  }

}
