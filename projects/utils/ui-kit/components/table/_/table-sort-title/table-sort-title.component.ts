import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  UkImageComponent,
  UkTextComponent,
} from '@utils/ui-kit/components/public-api';
import type { UkSortModel } from '@utils/ui-kit/definitions';
import { UK_TYPE, UkSortOrderType } from '@utils/ui-kit/definitions';

@Component({
  selector: 'uk-table-sort-title',
  imports: [UkImageComponent, UkTextComponent, CommonModule],
  templateUrl: './table-sort-title.component.html',
  styleUrl: './table-sort-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkTableSortTitleComponent {
  private _order: UkSortOrderType = UkSortOrderType.NONE;
  @Output()
  public readonly SORT_CHANGE = new EventEmitter<UkSortModel>();

  @Input()
  public column = '';

  @Input()
  public hasSort = false;

  public readonly UK_TYPE = UK_TYPE;
  public sortImage = this.getSortImage(UkSortOrderType.NONE);

  public get order(): UkSortOrderType {
    return this._order;
  }

  @Input()
  public set order(order: UkSortOrderType) {
    this._order = order;
    this.sortImage = this.getSortImage(order);
  }

  public onSortClick(): void {
    if (!this.column || !this.hasSort) return;
    this.order = this.getNextOrder(this.order);
    this.updateSortState();
  }

  private updateSortState(): void {
    this.SORT_CHANGE.emit({
      column: this.column,
      order: this.order,
    });
  }

  private getNextOrder(order: UkSortOrderType): UkSortOrderType {
    switch (order) {
      case UkSortOrderType.ASCENDING:
        return UkSortOrderType.DESCENDING;
      case UkSortOrderType.DESCENDING:
        return UkSortOrderType.NONE;
      case UkSortOrderType.NONE:
        return UkSortOrderType.ASCENDING;
    }
  }

  private getSortImage(order: UkSortOrderType): string {
    switch (order) {
      case UkSortOrderType.ASCENDING:
        return 'uk-images/svg/sorting-up.svg';
      case UkSortOrderType.DESCENDING:
        return 'uk-images/svg/sorting-down.svg';
      case UkSortOrderType.NONE:
        return 'uk-images/svg/sorting-empty.svg';
    }
  }
}
