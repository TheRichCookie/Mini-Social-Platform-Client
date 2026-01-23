import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum UkScrolledComponent {
  PAGE_COMPONENT = 'PAGE_COMPONENT',
  SCROLL_COMPONENT = 'SCROLL_COMPONENT',
}

@Injectable({
  providedIn: 'root',
})
export class UkScrollService {
  private readonly ensureScrollableContentSubject$ = new Subject<void>();
  private readonly reachedTopSubject$ = new Subject<UkScrolledComponent>();
  private readonly reachedBottomSubject$ = new Subject<UkScrolledComponent>();

  public readonly reachedTop$ = this.reachedTopSubject$.asObservable();
  public readonly reachedBottom$ = this.reachedBottomSubject$.asObservable();
  public readonly ensureScrollableContent$ =
    this.ensureScrollableContentSubject$.asObservable();

  public detectScrollBoundaries(
    event: Event,
    component: UkScrolledComponent,
  ): void {
    const el = event.target as HTMLElement;

    const atTop = el.scrollTop <= 5;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (atTop) {
      this.reachedTopSubject$.next(component);
    }

    if (atBottom) {
      this.reachedBottomSubject$.next(component);
    }
  }

  public reachedBottom(component: UkScrolledComponent): void {
    this.reachedBottomSubject$.next(component);
  }

  public ensureScrollableContent(): void {
    setTimeout(() => {
      this.ensureScrollableContentSubject$.next();
    });
  }
}
