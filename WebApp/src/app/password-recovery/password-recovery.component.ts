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
  errorMessage;

  constructor(private router: Router, private userDao: UserDao) { }

  ngOnInit(): void {
  }

  onReturnToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(form: NgForm) {
    var email = form.value.email;

    this.userDao.recoverPassword(email)
    .subscribe(res => {
      console.log(res);
    });
  }

}
