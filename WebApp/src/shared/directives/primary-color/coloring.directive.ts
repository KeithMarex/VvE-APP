import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Directive({
  selector: '[appColoring]'
})
export class ColoringDirective implements OnInit {
  @Input() colorStyle: string; // Primary or secondary color
  @Input() colorElement: string = 'color'; // Color or background-color

  private primaryColor = this.dataStorageService.getPrimaryColor();
  private secondaryColor =this.dataStorageService.getSecondaryColor();

  constructor(private elRef: ElementRef, private renderer: Renderer2, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    var chosenColor = this.primaryColor; // Default set to primary color, other values can be added below
    console.log(this.colorStyle);
    if (this.colorStyle == 'secondary')
    {
      chosenColor = this.secondaryColor;
    }

    this.renderer.setStyle(this.elRef.nativeElement, this.colorElement, chosenColor); //FIXME use colorStyle
  }

}
