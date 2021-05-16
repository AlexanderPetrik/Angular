import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appInfo]'
})
export class InfoDirective implements OnInit, OnDestroy {
  @Input('appInfo') infoText: string;
  private clickListener: EventListener;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.clickListener = this.el.nativeElement.addEventListener('click', () => this.showMessage());
  }

  showMessage() {
    alert(this.infoText);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickListener);
  }

}
