# ngx-photo-gallery

PhotoGallery library for Angular based on [PhotoSwipe](http://photoswipe.com/).

## Installation

| angular | package version |
| ------- | --------------- |
| 16      | 1.6.0           |
| 15      | 1.4.0 ~ 1.5.0   |
| 13~14   | 1.3.0           |

Install from npm:

```
npm install --save @twogate/ngx-photo-gallery
```

Add PhotoGalleryModule to NgModule imports:

```ts
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery'

@NgModule({
  ...
  imports: [PhotoGalleryModule, ...]
  ...
})
```

with options ([PhotoSwipeOptions](https://photoswipe.com/documentation/options.html)):

```ts
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery'

@NgModule({
  ...
  imports: [PhotoGalleryModule.forRoot({
    defaultOptions: {
      arrowEl: true,
      indexIndicatorSep: '-'
    }
  }), ...]
  ...
})
```

## Usage

simple use:

```html
<div class="images" photoGalleryGroup>
  <div class="images-item" [photoGallery]="image1.originUrl">
    <img [src]="image1.thumbnailUrl" />
  </div>
  <div class="images-item" [photoGallery]="image2.originUrl">
    <img [src]="image2.thumbnailUrl" />
  </div>
  <div class="images-item" [photoGallery]="image3.originUrl">
    <img [src]="image3.thumbnailUrl" />
  </div>
</div>
```

with options ([PhotoSwipeOptions](https://photoswipe.com/documentation/options.html)):

```html
<div class="products" [photoGalleryGroup]="{ arrowEl: true, indexIndicatorSep: ' - ' }">
  <div class="products-item">
    <div class="products-item-name">{{ product1.name }}</div>
    <div class="products-item-image" [photoGallery]="product1.image.originUrl">
      <img [src]="product1.image.thumbnailUrl" />
    </div>
  </div>
  <div class="products-item">
    <div class="products-item-name">{{ product2.name }}</div>
    <div class="products-item-image" [photoGallery]="product2.image.originUrl">
      <img [src]="product2.image.thumbnailUrl" />
    </div>
  </div>
</div>
```

on Ionic project:

```html
<div
  class="images"
  photoGalleryGroup
  (onPhotoGalleryInit)="setSwipeBackEnabled(false)"
  (onPhotoGalleryDestroy)="setSwipeBackEnabled(true)"
>
  <div class="images-item" *ngFor="let image of images" [photoGallery]="image.originUrl">
    <img [src]="image.thumbnailUrl" />
  </div>
</div>
```

```ts
import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
...
})
export class AppComponent {
  images = [...]

  constructor(private navCtrl: NavController) {}

  setSwipeBackEnabled(value: boolean) {
    this.navCtrl.swipeBackEnabled = value
  }
}
```

## Earlier Version

Move to [`twogate/ngx-photo-gallery-v0`](https://github.com/twogate/ngx-photo-gallery-v0)
