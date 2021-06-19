import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  @Output() confirmed = new EventEmitter<void>();
  @Input() content = 'Weet u het zeker?';

  constructor() { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmed.emit();
  }

}
