import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDao } from 'src/shared/services/user-dao.service';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.scss']
})
export class AccountCreatorComponent implements OnInit {
  @Output() userCreated = new EventEmitter();
  errorMessage: string;

  constructor(private userDao: UserDao) { }

  ngOnInit(): void {
  }

  onCreateUser(form: NgForm) {
    this.errorMessage = null;
    const formValues = form.value;

    const mailValid = this.validateEmail(formValues.email, formValues.confirmEmail);

    if (mailValid) {
      const mForm = new FormData();

      mForm.append('email', formValues.email);
      mForm.append('firstname', formValues.firstname);
      mForm.append('lastname', formValues.lastname);
    }
    else {
      this.displayErrorMessage('Controleer of uw email op beide plekken correct is ingevoerd.');
    }
  }

  validateEmail(input: string, confirmInput: string): boolean {
    return input.includes('@') && input == confirmInput;
  }

  displayErrorMessage(message: string)
  {
    this.errorMessage = message;
  }
}
