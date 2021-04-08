import { Component, OnInit } from '@angular/core';
import {Page} from "@nativescript/core/ui/page";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

}
