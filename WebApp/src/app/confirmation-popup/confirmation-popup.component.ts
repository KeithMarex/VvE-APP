import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  @Input() content = 'Weet u het zeker?';

  constructor() { }

  ngOnInit(): void {
  }

}
