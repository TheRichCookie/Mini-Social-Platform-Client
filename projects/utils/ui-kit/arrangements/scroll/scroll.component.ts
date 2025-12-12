import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay'; // for cdkOverlay scroll handling
import {ScrollingModule} from '@angular/cdk/scrolling'; // for cdkOverlay scroll handling
import {CommonModule} from '@angular/common';
import type {ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {NgScrollbarModule} from 'ngx-scrollbar';

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
  public maxHeight: number = null!;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onScroll(event: any): void {
    const SCROLL_Y = event.target.scrollTop;
    const {scrollHeight} = event.target;
    const OFFSET_HEIGHT = event.target.offsetHeight;

    if (SCROLL_Y <= 10) {
      this.REACHED_TOP.emit();
    }

    if (SCROLL_Y + OFFSET_HEIGHT >= scrollHeight - 10) {
      this.REACHED_BOTTOM.emit();
    }

    if (SCROLL_Y + OFFSET_HEIGHT >= scrollHeight - 10 && !this.isLoading) {
      this.LOAD_MORE.emit();
    }
  }

  public onScrollUp(): void {}
  public onScrollDown(): void {}

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
}
