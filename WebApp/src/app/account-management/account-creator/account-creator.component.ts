import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.scss']
})
export class AccountCreatorComponent implements OnInit {
  errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
