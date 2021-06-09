import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-loader',
  templateUrl: './svg-loader.component.html',
  styleUrls: ['./svg-loader.component.scss']
})
export class SvgLoaderComponent implements OnInit {
  @Input() svgSource: string;
  @Input() tagToColor: string = 'path'; // Default set to path
  @Input() attributeToColor: string = 'stroke'; // Default set to stroke

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.elRef.nativeElement.innerHTML = this.svgSource;

    this.colorSvg();
  }

  colorSvg() {
    var elements = document.getElementsByTagName(this.tagToColor);

    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute(this.attributeToColor, "red"); //FIXME get color from data storage service
    }
  }
}
