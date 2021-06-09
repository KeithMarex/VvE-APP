import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Directive({
  selector: '[appSvgColoring]'
})
export class SvgColoringDirective implements OnInit {
  @Input() colorStyle: string; // Option to add different styles to element. Styles are defined in dataStorageService.
  @Input() tagToColor: string = 'path'; // Tag to color, default is set to path as most svg's use this
  @Input() attributeToColor: string = 'stroke'; // Property of tag that needs to be colored, default is set to stroke
  @Input() isActive: boolean = false;

  private primaryColor = this.dataStorageService.getPrimaryColor();
  private secondaryColor =this.dataStorageService.getSecondaryColor();

  constructor(private elRef: ElementRef, private renderer: Renderer2, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    var chosenColor = this.primaryColor; // Default set to primary color, other values can be added below
    if (this.colorStyle == 'secondary')
    {
      chosenColor = this.secondaryColor;
    }

    // var elements = document.getElementsByTagName(this.tagToColor);

    // for (var i = 0; i < elements.length; i++) {
    //   elements[i].setAttribute(this.attributeToColor, chosenColor);
    // }

    this.renderer.setStyle(this.elRef.nativeElement, 'stroke', chosenColor);
  }

}
