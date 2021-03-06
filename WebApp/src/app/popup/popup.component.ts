import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @Input() title = 'Popup title';
  @Input() fitContent: boolean;
  @Input() small: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closed.emit();
  }

}
