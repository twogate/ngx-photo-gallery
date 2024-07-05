import { ModuleWithProviders, NgModule } from '@angular/core';

import { LightboxComponent } from './components/lightbox/lightbox.component';
import { PhotoGalleryGroupDirective } from './directives/photo-gallery-group.directive';
import { PhotoGalleryDirective } from './directives/photo-gallery.directive';
import { PhotoGalleryConfig } from './interfaces/config';

@NgModule({
  providers: [],
  imports: [LightboxComponent, PhotoGalleryDirective, PhotoGalleryGroupDirective],
  exports: [PhotoGalleryDirective, PhotoGalleryGroupDirective],
})
export class PhotoGalleryModule {
  static forRoot(config: PhotoGalleryConfig): ModuleWithProviders<PhotoGalleryModule> {
    return {
      ngModule: PhotoGalleryModule,
      providers: [
        {
          provide: PhotoGalleryConfig,
          useValue: config,
        },
      ],
    };
  }
}
