import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {
  TileWidth,
  UkBooleanType,
  UkCursor,
} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';

@Component({
  selector: 'uk-tile',
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkTileComponent {
  @Input()
  public width: TileWidth = DEFAULT.tile.width;

  @Input()
  public cursor: UkCursor = DEFAULT.tile.cursor;

  @Input()
  public isSelected: UkBooleanType = DEFAULT.tile.isSelected;

  public readonly UK_TYPE = UK_TYPE;
}
