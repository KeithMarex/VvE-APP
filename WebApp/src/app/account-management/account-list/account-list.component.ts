import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user.model';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  users: User[];

  constructor(private userDao: UserDao) {}

  ngOnInit(): void {
    this.fetchOrganizationUsers();
  }

  fetchOrganizationUsers() {
    this.userDao.getUsersByOrganization()
    .subscribe(responseUsers => {
      this.users = responseUsers;
    })
  }

}
