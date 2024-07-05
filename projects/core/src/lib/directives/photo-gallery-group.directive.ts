import { Directive, Output, Input, EventEmitter, Optional } from '@angular/core';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

import { PhotoGalleryConfig } from '../interfaces/config';
import { GalleryImage, GalleryItem, GalleryOptions } from '../interfaces/photoswipe';
import { LightboxService } from '../services/lightbox.service';

export const DEFAULT_OPTIONS = {
  history: false,
  closeEl: true,
  captionEl: false,
  fullscreenEl: false,
  zoomEl: true,
  shareEl: false,
  counterEl: true,
  arrowEl: false,
  preloaderEl: true,
};

@Directive({
  selector: '[photoGalleryGroup]',
  standalone: true,
})
export class PhotoGalleryGroupDirective {
  @Input('photoGalleryGroup') options: GalleryOptions;
  @Output() onPhotoGalleryInit = new EventEmitter();
  @Output() onPhotoGalleryDestroy = new EventEmitter();

  private defaultOptions: GalleryOptions;
  private gallery: any;
  private galleryItems: { [key: string]: GalleryItem } = {};
  private galleryItemIds: Set<string> = new Set<string>();
  private galleryImages: GalleryImage[] = [];

  constructor(
    @Optional() private photoGalleryConfig: PhotoGalleryConfig,
    private lightboxService: LightboxService
  ) {
    this.defaultOptions = { ...DEFAULT_OPTIONS, ...this.photoGalleryConfig?.defaultOptions };
  }

  registerGalleryItem(item: { id: string; element: HTMLElement; imageUrl: string; caption?: string }): void {
    const image: GalleryImage = {
      id: item.id,
      src: item.imageUrl,
      ...(item.caption ? { title: item.caption } : {}),
      w: 0,
      h: 0,
      doGetSlideDimensions: true,
    };
    this.galleryItems[item.id] = {
      id: item.id,
      element: item.element,
      image,
    };

    this.galleryItemIds.add(item.id);
  }

  unregisterGalleryItem(id: string): void {
    this.galleryItemIds.delete(id);
  }

  async openPhotoSwipe(id: string): Promise<void> {
    this.lightboxService.create();

    if (this.galleryItems[id].image.doGetSlideDimensions) {
      const targetImage = await loadImage(this.galleryItems[id].image.src);
      this.galleryItems[id].image.w = targetImage.naturalWidth;
      this.galleryItems[id].image.h = targetImage.naturalHeight;
      delete this.galleryItems[id].image.doGetSlideDimensions;
    }

    this.galleryImages = [...this.galleryItemIds].map((key) => this.galleryItems[key].image);
    const idx = this.galleryImages.findIndex((image) => image.id === id);
    const options: GalleryOptions = { ...this.defaultOptions, ...this.options };
    options.index = idx;
    options.getThumbBoundsFn = (imageIndex: number) => {
      const key = this.galleryImages[imageIndex].id;
      const thumbnail = this.galleryItems[key].element;
      const origin = this.galleryItems[key].image;
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      const rect = thumbnail.getBoundingClientRect();

      const thumbnailRate = rect.height / rect.width;
      const originRate = origin.h / origin.w;
      let x: number, y: number, w: number;
      if (thumbnailRate > originRate) {
        // portrait
        y = rect.top + pageYScroll;
        w = (origin.w * rect.height) / origin.h;
        x = rect.left - (w - rect.width) / 2;
      } else {
        // landscape
        const imageHeight = (origin.h * rect.width) / origin.w;
        x = rect.left;
        w = rect.width;
        y = rect.top + pageYScroll - (imageHeight - rect.height) / 2;
      }

      return { x, y, w };
    };
    const photoSwipe = this.lightboxService.getLightboxElement();

    this.gallery = new PhotoSwipe(photoSwipe, PhotoSwipeUI_Default, this.galleryImages, options);
    this.gallery.listen('gettingData', (_, slide: GalleryImage) => {
      if (slide.doGetSlideDimensions) {
        setTimeout(async () => {
          await this.getSlideDimensions(slide);
        }, 300);
      }
    });
    this.gallery.listen('imageLoadComplete', async (_, slide: GalleryImage) => {
      if (slide.doGetSlideDimensions) {
        await this.getSlideDimensions(slide);
      }
    });
    this.gallery.listen('destroy', () => {
      this.lightboxService.destroy();
      this.onPhotoGalleryDestroy.emit();
    });
    this.onPhotoGalleryInit.emit();
    this.gallery.init();
  }

  private async getSlideDimensions(slide: GalleryImage): Promise<void> {
    if (!slide.doGetSlideDimensions) {
      return;
    }

    const image: HTMLImageElement = await loadImage(slide.src).catch(() => null);

    slide.doGetSlideDimensions = false;

    slide.w = image.naturalWidth;
    slide.h = image.naturalHeight;

    this.gallery.invalidateCurrItems();
    this.gallery.updateSize(true);
  }
}

function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
    image.src = path;
  });
}
