import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {UK_TYPE} from '@utils/ui-kit/definitions';

import type {IconName} from '../../definitions';
import {UkIconComponent} from '../icon/icon.component';
import {UkTextComponent} from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-header-title',
  imports: [CommonModule, UkIconComponent, UkTextComponent],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkHeaderTitleComponent {
  @Input()
  public iconName: IconName = null!;

  @Output()
  public readonly ON_ICON_CLICK = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;

  public onClick(): void {
    this.ON_ICON_CLICK.emit();
  }
}
