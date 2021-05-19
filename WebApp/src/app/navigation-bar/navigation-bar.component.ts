import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  primaryColor: string = "#451864";
  secondaryColor: string = "#A0CAE8";
  highlightColor: string = "#ffffff";

  constructor() { }

  ngOnInit(): void {
  }

}
