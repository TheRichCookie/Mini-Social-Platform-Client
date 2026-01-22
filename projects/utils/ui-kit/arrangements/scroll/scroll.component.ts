import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay'; // for cdkOverlay scroll handling
import { ScrollingModule } from '@angular/cdk/scrolling'; // for cdkOverlay scroll handling
import { CommonModule } from '@angular/common';
import type { AfterViewInit, ElementRef } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UkScrollService } from '@utils/ui-kit/services';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { debounceTime, Subject } from 'rxjs';

import { UkAnimationComponent } from '../../animations/animation/animation.component';
import type { BooleanType } from '../../definitions';
import { DEFAULT, UK_TYPE } from '../../definitions';

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
export class UkScrollComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly scrollService = inject(UkScrollService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly bottomReached$ = new Subject<void>();

  @ViewChild('wrapperElement')
  public wrapperElement!: ElementRef;

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
  public readonly REACHED_BOTTOM = new EventEmitter();

  @Output()
  public readonly REACHED_TOP = new EventEmitter();

  @Output()
  public readonly LOAD_MORE = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;
  public autoAppearance: 'compact' | 'native' = 'compact';

  constructor() {
    this.bottomReached$
      .pipe(debounceTime(150), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.LOAD_MORE.emit();
      });
    this.scrollService.checkOverFlow$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.checkOverflow();
      });
  }

  public onScroll(event: Event): void {
    const el = event.target as HTMLElement;

    const atTop = el.scrollTop <= 5;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (atTop) {
      this.REACHED_TOP.emit();
    }

    if (atBottom) {
      this.bottomReached$.next();
    }
  }

  public afterUpdate(): void {
    this.checkScroll();
  }

  public checkScroll(): void {
    const WRAPPER = this.wrapperElement.nativeElement;
    const CONTENT = this.contentElement.nativeElement;

    if (this.appearance === 'auto') {
      this.autoAppearance =
        WRAPPER.clientHeight > CONTENT.clientHeight ? 'compact' : 'native';
      this.changeDetectorRef.markForCheck();
    }
  }

  public checkOverflow(): void {
    if (!this.isLoading) {
      const WRAPPER = this.wrapperElement.nativeElement;
      const CONTENT = this.contentElement.nativeElement;

      if (CONTENT.scrollHeight <= WRAPPER.clientHeight) {
        this.bottomReached$.next();
      }

      this.changeDetectorRef.markForCheck();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkOverflow();
    });
  }
}
