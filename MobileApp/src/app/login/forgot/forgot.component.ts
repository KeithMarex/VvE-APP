import { Component, OnInit } from '@angular/core';
import {Page} from "@nativescript/core/ui/page";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

}
