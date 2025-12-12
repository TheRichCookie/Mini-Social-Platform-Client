import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import type {BooleanType} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-desktop-form-row',
  imports: [CommonModule],
  templateUrl: './desktop-form-row.component.html',
  styleUrl: './desktop-form-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDesktopFormRowComponent {
  @Input()
  public isDivided: BooleanType = DEFAULT.desktopFormRow.isDivided;

  @Input()
  public hasBorder: BooleanType = DEFAULT.desktopFormRow.hasBorder;

  @Input()
  public isFlex: BooleanType = DEFAULT.desktopFormRow.isFlex;

  public readonly UK_TYPE = UK_TYPE;

  @HostBinding('class.uk-desktop-form-row-has-border-TRUE')
  private get getHasBorder(): boolean {
    return this.hasBorder === UK_TYPE.UK.BOOLEAN.TRUE;
  }
}
