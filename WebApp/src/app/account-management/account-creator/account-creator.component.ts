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
    const formValues = form.value;
    const mForm = new FormData();


  }
}
