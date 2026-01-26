import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay'; // for cdkOverlay scroll handling
import {ScrollingModule} from '@angular/cdk/scrolling'; // for cdkOverlay scroll handling
import {CommonModule} from '@angular/common';
import type {ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {debounceTime, Subject} from 'rxjs';

import {UkAnimationComponent} from '../../animations/animation/animation.component';
import type {BooleanType} from '../../definitions';
import {DEFAULT, UK_TYPE} from '../../definitions';

@Component({
  standalone: true,
  selector: 'uk-scroll',
  imports: [
    NgScrollbarModule,
    CommonModule,
    UkAnimationComponent,
    BidiModule,
    OverlayModule,
    ScrollingModule,
  ],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkScrollComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly loadMoreSubject$ = new Subject<void>();
  private _isLoading = false;

  @ViewChild('mainElement')
  public mainElement!: ElementRef;

  @ViewChild('contentElement')
  public contentElement!: ElementRef;

  @Input()
  public orientation: 'auto' | 'horizontal' | 'vertical' = 'auto';

  @Input()
  public visibility: 'hover' | 'native' | 'visible' = 'native';

  @Input()
  public appearance: 'auto' | 'compact' | 'native' = 'compact';

  @Input()
  public showScrollbar: BooleanType = DEFAULT.scroll.showScrollbar;

  @Input()
  public contentHasSideMargin: BooleanType =
    DEFAULT.scroll.contentHasSideMargin;

  @Input()
  public contentHasBottomMargin: BooleanType =
    DEFAULT.scroll.contentHasBottomMargin;

  @Input()
  public maxHeight?: number;

  @Output()
  public readonly LOAD_MORE = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;
  public autoAppearance: 'compact' | 'native' = 'compact';

  constructor() {
    this.loadMoreSubject$
      .pipe(debounceTime(150), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.LOAD_MORE.emit();
      });
  }

  @Input()
  public set isLoading(value: boolean) {
    this._isLoading = value;

    if (!value) {
      setTimeout(() => {
        this.ensureScrollableContent();
      });
    }
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public afterUpdate(): void {
    this.updateAppearance();
  }

  public detectScrollBoundaries(event: Event): void {
    const el = event.target as HTMLElement;

    // const atTop = el.scrollTop <= 5;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (atBottom) {
      this.loadMoreSubject$.next();
    }
  }

  public ensureScrollableContent(): void {
    if (!this.isLoading) {
      const mainElement = this.mainElement.nativeElement;
      const contentElement = this.contentElement.nativeElement;

      if (contentElement.scrollHeight <= mainElement.clientHeight) {
        this.loadMoreSubject$.next();
      }

      this.changeDetectorRef.markForCheck();
    }
  }

  public updateAppearance(): void {
    const WRAPPER = this.mainElement.nativeElement;
    const CONTENT = this.contentElement.nativeElement;

    if (this.appearance === 'auto') {
      this.autoAppearance =
        WRAPPER.clientHeight > CONTENT.clientHeight ? 'compact' : 'native';
      this.changeDetectorRef.markForCheck();
    }
  }
}
