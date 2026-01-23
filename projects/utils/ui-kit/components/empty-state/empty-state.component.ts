import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {
  EmptyStateStyle,
  EmptyStateType,
} from '@utils/ui-kit/definitions/components/empty-state/empty-state.type';

import {UkAnimationComponent} from '../../animations';
import type {IconFgColor, IconName} from '../../definitions';
import {DEFAULT, UK_TYPE} from '../../definitions';
import {UkIconComponent} from '../icon/icon.component';
import {UkImageBoxComponent} from '../image-box/image-box.component';
import {UkTextComponent} from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-empty-state',
  imports: [
    UkTextComponent,
    UkIconComponent,
    UkAnimationComponent,
    CommonModule,
    UkImageBoxComponent,
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkEmptyStateComponent {
  @Input()
  public iconFgColor: IconFgColor = DEFAULT.emptyState.iconFgColor;

  @Input()
  public style: EmptyStateStyle = DEFAULT.emptyState.style;

  @Input()
  public type: EmptyStateType = DEFAULT.emptyState.type;

  @Input()
  public iconName: IconName = DEFAULT.emptyState.iconName;

  public readonly UK_TYPE = UK_TYPE;
}
