import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  ComponentRef,
  ElementRef,
  Injector,
} from '@angular/core';

import { LightboxComponent } from '../components/lightbox/lightbox.component';

@Injectable({ providedIn: 'root' })
export class LightboxService {
  private lightboxElement: ElementRef;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {
    const lightbox: ComponentRef<LightboxComponent> = this.resolver
      .resolveComponentFactory(LightboxComponent)
      .create(this.injector);
    this.lightboxElement = lightbox.instance.element;
    this.applicationRef.attachView(lightbox.hostView);
    document.body.appendChild(lightbox.location.nativeElement);
  }

  getLightboxElement(): HTMLElement {
    return this.lightboxElement.nativeElement as HTMLElement;
  }
}
