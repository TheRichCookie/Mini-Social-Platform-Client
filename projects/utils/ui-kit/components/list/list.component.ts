import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { DEFAULT, UK_TYPE, UkAutoBooleanType } from '@utils/ui-kit/definitions';

import { UkTextComponent } from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-list',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkListComponent {
  @Input()
  public bottomBorder: UkAutoBooleanType = DEFAULT.listItem.bottomBorder;

  @Input()
  public bullet = false;

  public readonly UK_TYPE = UK_TYPE;

  @HostBinding('class.auto-bottom-border')
  private get isAutoBottomBorder(): boolean {
    return this.bottomBorder === UkAutoBooleanType.AUTO;
  }

  @HostBinding('class.true-bottom-border')
  private get isTrueBottomBorder(): boolean {
    return this.bottomBorder === UkAutoBooleanType.TRUE;
  }

  @HostBinding('class.false-bottom-border')
  private get isFalseBottomBorder(): boolean {
    return this.bottomBorder === UkAutoBooleanType.FALSE;
  }
}
