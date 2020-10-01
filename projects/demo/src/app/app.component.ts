import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  images = [
    { src: 'https://picsum.photos/seed/1/800/600' },
    { src: 'https://picsum.photos/seed/2/600/800' },
    { src: 'https://picsum.photos/seed/3/800/800' },
    { src: 'https://picsum.photos/seed/4/800/600' },
    { src: 'https://picsum.photos/seed/5/600/800' },
    { src: 'https://picsum.photos/seed/6/800/800' },
    { src: 'https://picsum.photos/seed/7/800/600' },
    { src: 'https://picsum.photos/seed/8/600/800' },
    { src: 'https://picsum.photos/seed/9/800/800' },
    { src: 'https://picsum.photos/seed/10/800/600' },
    { src: 'https://picsum.photos/seed/11/600/800' },
    { src: 'https://picsum.photos/seed/12/800/800' },
  ];
}
