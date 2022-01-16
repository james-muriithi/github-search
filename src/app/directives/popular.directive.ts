import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPopular]',
})
export class PopularDirective {
  @Input() appPopular: Boolean = false;

  constructor(public el: ElementRef) {}

  ngAfterViewInit() {    
    this.highlight();
  }

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    const popularRibbon = this.el.nativeElement
      .querySelector('.popular-badge .badge');
    if (!!popularRibbon) {
      this.appPopular
        ? (popularRibbon.style.display = 'inline-block')
        : (popularRibbon.style.display = 'none');
    }
  }
}
