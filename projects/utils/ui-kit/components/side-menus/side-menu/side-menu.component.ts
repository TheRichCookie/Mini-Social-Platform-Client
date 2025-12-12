import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {UkIconComponent} from '@utils/ui-kit/components/icon/icon.component';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import type {UkMenu} from '@utils/ui-kit/definitions/components/side-menu/side-menu.interface';

import {UkTextComponent} from '../../public-api';

@Component({
  standalone: true,
  selector: 'uk-side-menu',
  imports: [CommonModule, UkIconComponent, UkTextComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkSideMenuComponent {
  @Input()
  public menu: UkMenu = null!;

  @Output()
  public readonly ON_CLICK = new EventEmitter<UkMenu>();

  public readonly UK_TYPE = UK_TYPE;

  public onClick(): void {
    this.ON_CLICK.emit(this.menu);
  }
}
