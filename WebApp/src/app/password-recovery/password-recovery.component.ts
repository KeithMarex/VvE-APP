import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  notificationMessage = '';
  success = false;
  isLoading = false;

  constructor(private router: Router, private userDao: UserDao) { }

  ngOnInit(): void {
  }

  onReturnToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(form: NgForm) {
    this.success = false;
    this.isLoading = true;
    var email = form.value.email;

    this.userDao.recoverPassword(email)
    .subscribe(res => {
      this.success = true;
      this.notificationMessage = res.message;
    }
    , err => {
      this.notificationMessage = err.statusText;
    })
    .add(() => {
      this.isLoading = false;
    });
  }

}
