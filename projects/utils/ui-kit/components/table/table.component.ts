import {CommonModule} from '@angular/common';
import type {TemplateRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  UkEmptyStateComponent,
  UkIconComponent,
  UkPaginationComponent,
} from '@utils/ui-kit/components';
import {DEFAULT, UK_TYPE} from '@utils/ui-kit/definitions';
import {TableModule} from 'primeng/table';

import type {UkTableOptions} from '../../definitions/components/table/table.interface';

@Component({
  standalone: true,
  selector: 'uk-table',
  imports: [
    CommonModule,
    TableModule,
    UkPaginationComponent,
    UkIconComponent,
    UkEmptyStateComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkTableComponent<T> {
  @ContentChild('tableEmptyStateTemplate')
  public tableEmptyStateTemplate!: TemplateRef<unknown>;

  @ContentChild('ukTableHeader')
  public ukTableHeader!: TemplateRef<unknown>;

  @ContentChild('ukTableBody')
  public ukTableBody!: TemplateRef<unknown>;

  @Input()
  public tableOptions: UkTableOptions = {
    paginator: true,
    responsiveLayout: DEFAULT.table.layout,
  };

  @Input()
  public tableData!: T[];

  @Input()
  public isLoading = false;

  @Input()
  public rows = 10;

  @Input()
  public totalItems = 0;

  @Input()
  public page = 0;

  @Output()
  public readonly ON_PAGE_CHANGE = new EventEmitter<number>();

  public readonly changeDetectorRef = inject(ChangeDetectorRef);
  public readonly UK_TYPE = UK_TYPE;
  public first = 0;

  public changePage(page: number): void {
    this.ON_PAGE_CHANGE.emit(page);
  }

  public hasPagination(): boolean {
    return this.tableOptions.paginator && this.totalItems > this.rows;
  }
}
