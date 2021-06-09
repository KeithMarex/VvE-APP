import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Directive({
  selector: '[appSvgColoring]'
})
export class SvgColoringDirective implements OnInit {
  @Input() colorStyle: string; // Option to add different styles to element. Styles are defined in dataStorageService.
  @Input() colorAttribute: string = 'stroke'; // Property of element that needs to be colored, default is set to color

  private primaryColor = this.dataStorageService.getPrimaryColor();
  private secondaryColor =this.dataStorageService.getSecondaryColor();

  constructor(private elRef: ElementRef, private renderer: Renderer2, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    var chosenColor = this.primaryColor; // Default set to primary color, other values can be added below
    if (this.colorStyle == 'secondary')
    {
      chosenColor = this.secondaryColor;
    }

    this.renderer.setStyle(this.elRef.nativeElement, this.colorAttribute, chosenColor);
  }

}
