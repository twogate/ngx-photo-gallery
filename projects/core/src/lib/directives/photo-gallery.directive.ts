import { Directive, HostListener, Input, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';

import { PhotoGalleryGroupDirective } from './photo-gallery-group.directive';

@Directive({
  selector: '[photoGallery]',
})
export class PhotoGalleryDirective implements AfterContentInit, OnDestroy {
  @Input('photoGallery') imageUrl: string;
  @Input() photoGalleryTrackBy: string;
  @Input() photoGalleryCaption: string;
  id: string;

  constructor(private el: ElementRef, private photoGalleryGroup: PhotoGalleryGroupDirective) {}

  @HostListener('click')
  async openPhotoSwipe(): Promise<void> {
    await this.photoGalleryGroup.openPhotoSwipe(this.id);
  }

  ngAfterContentInit(): void {
    this.id = this.photoGalleryTrackBy || this.imageUrl;
    this.photoGalleryGroup.registerGalleryItem({
      id: this.id,
      element: this.el.nativeElement as HTMLElement,
      imageUrl: this.imageUrl,
      caption: this.photoGalleryCaption,
    });
  }

  ngOnDestroy(): void {
    this.photoGalleryGroup.unregisterGalleryItem(this.id);
  }
}
