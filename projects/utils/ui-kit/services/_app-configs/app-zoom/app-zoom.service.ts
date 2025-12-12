import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum UkAppZoom {
  SMALLER = 'SMALLER',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  LARGER = 'LARGER',
}

@Injectable({
  providedIn: 'root',
})
export class UkAppSizeService {
  private readonly document = inject(DOCUMENT);
  private readonly appZoomSubject = new Subject<UkAppZoom>();
  private appZoom: UkAppZoom = null!;

  protected init(appZoom: UkAppZoom): void {
    this.appZoom = appZoom;

    this.clearZoom();
    this.document.body.classList.add(`app-zoom-${this.appZoom}`);
    this.appZoomSubject.next(this.appZoom);
  }

  protected clearZoom(): void {
    this.document.body.classList.remove('app-zoom-SMALLER');
    this.document.body.classList.remove('app-zoom-SMALL');
    this.document.body.classList.remove('app-zoom-MEDIUM');
    this.document.body.classList.remove('app-zoom-LARGE');
    this.document.body.classList.remove('app-zoom-LARGER');
  }

  protected zoomIn(): void {
    switch (this.appZoom) {
      case UkAppZoom.SMALLER:
        this.appZoom = UkAppZoom.SMALL;
        break;
      case UkAppZoom.SMALL:
        this.appZoom = UkAppZoom.MEDIUM;
        break;
      case UkAppZoom.MEDIUM:
        this.appZoom = UkAppZoom.LARGE;
        break;
      case UkAppZoom.LARGE:
        this.appZoom = UkAppZoom.LARGER;
        break;
      case UkAppZoom.LARGER:
        break;
    }

    this.clearZoom();
    this.document.body.classList.add(`app-zoom-${this.appZoom}`);
    this.appZoomSubject.next(this.appZoom);
  }

  protected zoomOut(): void {
    switch (this.appZoom) {
      case UkAppZoom.SMALLER:
        break;
      case UkAppZoom.SMALL:
        this.appZoom = UkAppZoom.SMALLER;
        break;
      case UkAppZoom.MEDIUM:
        this.appZoom = UkAppZoom.SMALL;
        break;
      case UkAppZoom.LARGE:
        this.appZoom = UkAppZoom.MEDIUM;
        break;
      case UkAppZoom.LARGER:
        this.appZoom = UkAppZoom.LARGE;
        break;
    }

    this.clearZoom();
    this.document.body.classList.add(`app-zoom-${this.appZoom}`);
    this.appZoomSubject.next(this.appZoom);
  }

  protected zoom(appZoom: UkAppZoom): void {
    this.appZoom = appZoom;
    this.appZoomSubject.next(appZoom);
  }
}
