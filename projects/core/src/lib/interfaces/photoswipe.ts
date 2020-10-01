export interface GalleryImage {
  id: string;
  src: string;
  title?: string;
  w: number;
  h: number;
  doGetSlideDimensions?: boolean;
}

export interface GalleryItem {
  id: string;
  element: HTMLElement;
  image: GalleryImage;
}

export interface GalleryShareButton {
  id: string;
  label: string;
  url: string;
  download?: boolean;
}

export interface GalleryOptions {
  // Core Options
  index?: number;
  getThumbBoundsFn?: (index: number) => { x: number; y: number; w: number };
  showHideOpacity?: boolean;
  showAnimationDuration?: number;
  hideAnimationDuration?: number;
  bgOpacity?: number;
  spacing?: number;
  allowPanToNext?: boolean;
  maxSpreadZoom?: number;
  getDoubleTapZoom?: (isMouseClick: boolean, item: any) => number;
  loop?: boolean;
  pinchToClose?: boolean;
  closeOnScroll?: boolean;
  closeOnVerticalDrag?: boolean;
  mouseUsed?: boolean;
  escKey?: boolean;
  arrowKeys?: boolean;
  history?: boolean;
  galleryUID?: number;
  galleryPIDs?: boolean;
  errorMsg?: string;
  preload?: number[];
  mainClass?: string;
  getNumItemsFn?: () => any;
  focus?: boolean;
  isClickableElement?: (el: any) => boolean;
  modal?: boolean;

  // UI Options
  barsSize?: { top: number; bottom?: 'auto' };
  timeToIdle?: number;
  timeToIdleOutside?: number;
  loadingIndicatorDelay?: number;
  addCaptionHTMLFn?: (item: any, captionEl: any, isFake: boolean) => boolean;
  closeEl?: boolean;
  captionEl?: boolean;
  fullscreenEl?: boolean;
  zoomEl?: boolean;
  shareEl?: boolean;
  counterEl?: boolean;
  arrowEl?: boolean;
  preloaderEl?: boolean;
  tapToClose?: boolean;
  tapToToggleControls?: boolean;
  clickToCloseNonZoomable?: boolean;
  closeElClasses?: string[];
  indexIndicatorSep?: string;
  shareButtons?: GalleryShareButton[];
  getImageURLForShare?: (shareButtonData: GalleryShareButton[]) => string;
  getPageURLForShare?: (shareButtonData: GalleryShareButton[]) => string;
  getTextForShare?: (shareButtonData: GalleryShareButton[]) => string;
  parseShareButtonOut?: (shareButtonData: GalleryShareButton[], shareButtonOut: string) => string;
}
