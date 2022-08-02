import { Injectable, ComponentRef, ElementRef, ViewContainerRef } from '@angular/core';

import { LightboxComponent } from '../components/lightbox/lightbox.component';

@Injectable({ providedIn: 'root' })
export class LightboxService {
  private lightbox: ComponentRef<LightboxComponent>;
  private lightboxElement: ElementRef;

  constructor() {}

  initialize(viewContainerRef: ViewContainerRef) {
    this.lightbox = viewContainerRef.createComponent(LightboxComponent);
    this.lightboxElement = this.lightbox.instance.element;
    document.body.appendChild(this.lightbox.location.nativeElement);
  }

  getLightboxElement(): HTMLElement {
    return this.lightboxElement.nativeElement as HTMLElement;
  }
}
