import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Directive({
  selector: '[appColoring]'
})
export class ColoringDirective implements OnInit {
  @Input() colorStyle: string; // Option to add different styles to element. Styles are defined in dataStorageService.
  @Input() colorElement: string = 'color'; // Property of element that needs to be colored, default is set to color

  private primaryColor = this.dataStorageService.getPrimaryColor();
  private secondaryColor =this.dataStorageService.getSecondaryColor();

  constructor(private elRef: ElementRef, private renderer: Renderer2, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    var chosenColor = this.primaryColor; // Default set to primary color, other values can be added below
    if (this.colorStyle == 'secondary')
    {
      chosenColor = this.secondaryColor;
    }

    this.renderer.setStyle(this.elRef.nativeElement, this.colorElement, chosenColor);
  }

}
