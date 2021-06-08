import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColoring]'
})
export class ColoringDirective implements OnInit {
  @Input() colorStyle: string; // Primary or secondary color
  @Input() colorElement: string = 'color'; // Color or background-color

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, this.colorElement, 'red'); //FIXME use colorStyle
  }

}
