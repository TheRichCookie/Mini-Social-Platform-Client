import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {UkScrolledComponent, UkScrollService} from '@utils/ui-kit/services';

import type {BooleanType, PageBackgroundColor} from '../../definitions';
import {DEFAULT, UkPageBodyOverFlow} from '../../definitions';

@Component({
  standalone: true,
  selector: 'uk-page',
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkPageComponent {
  private readonly scrollService = inject(UkScrollService);

  @Input()
  public headerBackgroundColor: PageBackgroundColor =
    DEFAULT.page.headerBackgroundColor;

  @Input()
  public bodyBackgroundColor: PageBackgroundColor =
    DEFAULT.page.bodyBackgroundColor;

  @Input()
  public footerBackgroundColor: PageBackgroundColor =
    DEFAULT.page.footerBackgroundColor;

  @Input()
  public topMargin: BooleanType = DEFAULT.page.topMargin;

  @Input()
  public bottomMargin: BooleanType = DEFAULT.page.bottomMargin;

  @Input()
  public bodyOverFlow: UkPageBodyOverFlow = DEFAULT.page.bodyOverFlow;

  @Input()
  public showHeaderBorder = true;

  @Input()
  public showFooterBorder = true;

  public onScroll(event: Event): void {
    if (this.bodyOverFlow === UkPageBodyOverFlow.SCROLL) {
      this.scrollService.detectScrollBoundaries(
        event,
        UkScrolledComponent.PAGE_COMPONENT,
      );
    }
  }
}
