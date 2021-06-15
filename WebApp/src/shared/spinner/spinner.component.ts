import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    public items = Array(4);
    // @Input() size = 'small | medium | large | giant';

  constructor() { }

  ngOnInit(): void {
  }

}
