import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTermChanged = new EventEmitter<string>();
  searchInput = '';

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(): void {
    this.searchTermChanged.emit(this.searchInput);
  }

}
