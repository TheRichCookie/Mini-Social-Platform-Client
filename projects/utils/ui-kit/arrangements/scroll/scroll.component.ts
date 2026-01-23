import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay'; // for cdkOverlay scroll handling
import {ScrollingModule} from '@angular/cdk/scrolling'; // for cdkOverlay scroll handling
import {CommonModule} from '@angular/common';
import type {AfterViewInit, ElementRef} from '@angular/core';
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
import {UkScrolledComponent, UkScrollService} from '@utils/ui-kit/services';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {debounceTime} from 'rxjs';

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
    InfiniteScrollModule,
  ],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkScrollComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly scrollService = inject(UkScrollService);
  private readonly destroyRef = inject(DestroyRef);

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

  @Input()
  public isLoading = false;

  @Output()
  public readonly SCROLL_COMPONENT_LOAD_MORE = new EventEmitter();

  @Output()
  public readonly PAGE_COMPONENT_LOAD_MORE = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;
  public autoAppearance: 'compact' | 'native' = 'compact';

  constructor() {
    this.scrollService.reachedBottom$
      .pipe(debounceTime(150), takeUntilDestroyed(this.destroyRef))
      .subscribe((component: UkScrolledComponent) => {
        if (component === UkScrolledComponent.SCROLL_COMPONENT) {
          this.SCROLL_COMPONENT_LOAD_MORE.emit();
        }

        if (component === UkScrolledComponent.PAGE_COMPONENT) {
          this.PAGE_COMPONENT_LOAD_MORE.emit();
        }
      });
    this.scrollService.ensureScrollableContent$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.ensureScrollableContent();
      });
  }

  public afterUpdate(): void {
    this.updateAppearance();
  }

  public onScroll(event: Event): void {
    this.scrollService.detectScrollBoundaries(
      event,
      UkScrolledComponent.SCROLL_COMPONENT,
    );
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

  public ensureScrollableContent(): void {
    if (!this.isLoading) {
      const mainElement = this.mainElement.nativeElement;
      const content = this.contentElement.nativeElement;

      console.log(content.scrollHeight, mainElement.clientHeight);

      if (content.scrollHeight <= mainElement.clientHeight) {
        this.scrollService.reachedBottom(UkScrolledComponent.SCROLL_COMPONENT);
      }

      this.changeDetectorRef.markForCheck();
    }
  }

  public ngAfterViewInit(): void {
    // this.scrollService.ensureScrollableContent();
  }
}
