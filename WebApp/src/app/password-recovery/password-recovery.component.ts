import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  errorMessage;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onReturnToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(form: NgForm) {
    var email = form.value.email;

    //TODO api request to recover password
  }

}
