import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'photo-gallery-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LightboxComponent {
  @ViewChild('Lightbox', { static: true }) element: ElementRef;

  constructor() {}
}
