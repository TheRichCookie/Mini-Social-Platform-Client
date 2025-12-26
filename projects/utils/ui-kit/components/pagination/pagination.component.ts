import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { UkIconComponent, UkTextComponent } from '@utils/ui-kit/components';
import { UK_TYPE } from '@utils/ui-kit/definitions';
import type { PagixReturn } from 'pagix';
import { pagix } from 'pagix';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  standalone: true,
  selector: 'uk-pagination',
  imports: [CommonModule, UkTextComponent, UkIconComponent, PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkPaginationComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private _pageSize = 10;
  private _totalItems = 0;
  private _currentPage = 0; // zero base

  @Output()
  public readonly CHANGE_PAGE = new EventEmitter<number>();

  public totalPages = 0;
  public readonly UK_TYPE = UK_TYPE;
  public pagination: PagixReturn = null!;

  public firstDots = false;
  public secondDots = false;

  public get pageSize(): number {
    return this._pageSize;
  }

  @Input()
  public set pageSize(val: number) {
    this._pageSize = val;
    this.setTotalPages();
  }

  public get totalItems(): number {
    return this._totalItems;
  }

  @Input()
  public set totalItems(val: number) {
    this._totalItems = val;
    this.setTotalPages();
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  @Input()
  public set currentPage(val: number) {
    this._currentPage = val;
    this.updatePageButtons();
  }

  public onChangePage(pageNumber: number): void {
    this.CHANGE_PAGE.emit(pageNumber - 1);
  }

  public onGoPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.CHANGE_PAGE.emit(this.currentPage);
    }
  }

  public onGoNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.CHANGE_PAGE.emit(this.currentPage);
    }
  }

  private updatePageButtons(): void {
    this.pagination = pagix({
      records: this.totalItems,
      limit: this.pageSize,
      current: this.currentPage + 1,
      delta: 1,
      fixed: 1,
    });

    // firstDots
    this.firstDots = true;

    if (this.pagination.start.length === 0) {
      this.firstDots = false;
    }

    if (this.pagination.middle.length === 0) {
      this.firstDots = false;
    }

    if (
      this.pagination.middle[0] - 1 ===
      this.pagination.start[this.pagination.start.length - 1]
    ) {
      this.firstDots = false;
    }

    if (
      this.pagination.end[0] - 1 ===
      this.pagination.start[this.pagination.start.length - 1]
    ) {
      this.firstDots = false;
    }

    // secondDots
    this.secondDots = true;

    if (this.pagination.middle.length === 0) {
      this.secondDots = false;
    }

    if (this.pagination.end.length === 0) {
      this.secondDots = false;
    }

    if (
      this.pagination.end[0] - 1 ===
      this.pagination.middle[this.pagination.middle.length - 1]
    ) {
      this.secondDots = false;
    }
  }

  private setTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePageButtons();
    this.changeDetectorRef.markForCheck();
  }
}
