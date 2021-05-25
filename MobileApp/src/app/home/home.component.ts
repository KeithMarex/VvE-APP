import { Component, OnInit } from '@angular/core'

@Component({
  moduleId: module.id,
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }
}
