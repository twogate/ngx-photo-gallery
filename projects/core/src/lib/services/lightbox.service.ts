import { Injectable, ComponentRef, ElementRef, ApplicationRef, createComponent } from '@angular/core';

import { LightboxComponent } from '../components/lightbox/lightbox.component';

@Injectable({ providedIn: 'root' })
export class LightboxService {
  private lightbox: ComponentRef<LightboxComponent> | null;
  private lightboxElement: ElementRef | null;

  constructor(private applicationRef: ApplicationRef) {
    this.lightbox = null;
    this.lightboxElement = null;
  }

  create() {
    this.lightbox = createComponent(LightboxComponent, { environmentInjector: this.applicationRef.injector });
    document.body.appendChild(this.lightbox.location.nativeElement);
    this.applicationRef.attachView(this.lightbox.hostView);

    this.lightboxElement = this.lightbox.instance.element;
  }

  destroy() {
    if (this.lightbox) {
      this.applicationRef.detachView(this.lightbox.hostView);
      this.lightbox = null;
      this.lightboxElement = null;
    }
  }

  /**
   * Returns the lightbox element.
   * This method is called after the lightbox is created.
   * @returns HTMLElement
   */
  getLightboxElement(): HTMLElement {
    return this.lightboxElement.nativeElement as HTMLElement;
  }
}
