import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { UkCursor } from '@utils/ui-kit/definitions';
import { DEFAULT } from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-square-card-desktop',
  imports: [CommonModule],
  templateUrl: './square-card-desktop.component.html',
  styleUrl: './square-card-desktop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkSquareCardDesktopComponent {
  @Input()
  public cursor: UkCursor = DEFAULT.desktopSquareCard.cursor;
}
