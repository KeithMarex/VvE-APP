import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-svg',
  templateUrl: './test-svg.component.html',
  styleUrls: ['./test-svg.component.scss']
})
export class TestSvgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elements = document.getElementsByTagName('path');
    console.log("Found elements");

    for(var i = 0; i < elements.length; i++) {
      // console.log("Found elements");
      elements[i].setAttribute("stroke", "red");
    }
  }

}
