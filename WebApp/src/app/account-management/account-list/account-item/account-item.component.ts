import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user.model';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {
  @Input() user: User;

  warningPopup = false;

  constructor(private userDao: UserDao) { }

  ngOnInit(): void {
  }

  onChangeRole() {
    var newRole = this.user.role == 'user' ? 'admin' : 'user';

    this.userDao.changeUserRole(this.user._id, newRole)
    .subscribe(() => {
      this.user.role = newRole;
    },
    err => {
      console.log(err.statusText);
    });
  }

  onDeleteUser() {
    //TODO add confirmation popup
    this.warningPopup = true;
    // this.userDao.deleteUser(this.user._id)
    // .subscribe(() => {
    //   location.reload();
    // }, err => {
    //   console.log(err);
    // });
  }

  onCloseWarning() {
    this.warningPopup = false;
  }
}
