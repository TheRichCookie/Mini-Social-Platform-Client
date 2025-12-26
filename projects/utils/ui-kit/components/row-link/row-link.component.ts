import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import type {BooleanType, RowLinkStatus} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';

import {UkTextComponent} from '../text/text.component';

@Component({
  selector: 'uk-row-link',
  imports: [CommonModule, UkTextComponent],
  templateUrl: './row-link.component.html',
  styleUrl: './row-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkRowLinkComponent {
  @Input()
  public status: RowLinkStatus = DEFAULT.rowLink.status;

  @ContentChild('START_ICON', {read: TemplateRef})
  public startIconTemplate!: TemplateRef<unknown>;

  @ContentChild('END_ICON', {read: TemplateRef})
  public endIconTemplate!: TemplateRef<unknown>;

  @Input()
  public title = '';

  @Input()
  public showBottom: BooleanType = DEFAULT.rowLink.showBottom;

  @Input()
  public subTitle = '';

  public readonly UK_TYPE = UK_TYPE;
}
