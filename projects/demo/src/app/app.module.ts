import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PhotoGalleryModule.forRoot({ defaultOptions: { showHideOpacity: true } })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
