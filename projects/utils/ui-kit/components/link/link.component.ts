import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { LinkTarget } from '@utils/ui-kit/definitions';
import { UkLinkTarget } from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-link',
  imports: [],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkLinkComponent {
  private _target = '_blank';

  @Input()
  public href!: string;

  @Input()
  public set target(target: LinkTarget) {
    switch (target as UkLinkTarget) {
      case UkLinkTarget.BLANK:
        this._target = '_blank';
        break;
      case UkLinkTarget.SELF:
        this._target = '_self';
        break;
      case UkLinkTarget.PARENT:
        this._target = '_parent	';
        break;
      case UkLinkTarget.TOP:
        this._target = '_top';
        break;

      default:
        this._target = '_blank';
        break;
    }
  }

  public get target(): string {
    return this._target;
  }
}
