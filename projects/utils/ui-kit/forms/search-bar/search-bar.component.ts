import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UkButtonComponent, UkIconComponent} from '@utils/ui-kit/components';
import {
  DEFAULT,
  type SearchBarStatus,
  UK_TYPE,
  UkSearchBarStatus,
} from '@utils/ui-kit/definitions';
import {UkNumberService, UkStringService} from '@utils/ui-kit/services';

import {UkInputComponent} from '../input/input.component';
import {UkSelectComponent} from '../select/select.component';

export interface UkSearchBarResult {
  searchValue: string | null;
  selectValue: string;
}

@Component({
  standalone: true,
  selector: 'uk-search-bar',
  imports: [
    UkInputComponent,
    UkIconComponent,
    UkButtonComponent,
    UkSelectComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkSearchBarComponent implements OnInit {
  private readonly stringService = inject(UkStringService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly numberService = inject(UkNumberService);
  private _searchValue = '';

  @Input()
  public selectItems: number[] | string[] = [];

  @Input()
  public selectValue = '';

  @Input()
  public selectPlaceholder = 'جستجو بر اساس';

  @Input()
  public endIconInput = false;

  @Input()
  public searchbarPlaceholderWithoutSelect = 'جستجو ...';

  @Input()
  public searchbarPlaceholderWithSelect: Record<string, string> = {};

  @Input()
  public status: SearchBarStatus = DEFAULT.searchBar.status;

  @Input()
  public selectBindValue = 'id';

  @Input()
  public selectBindLabel = 'name';

  @Output()
  public readonly ON_CLICK = new EventEmitter<[UkSearchBarResult, boolean]>();

  public shouldShowRemoveButton = false;
  public readonly UK_TYPE = UK_TYPE;

  @Input()
  public set searchValue(value: string) {
    this._searchValue = value;
  }

  public get searchValue(): string {
    return this._searchValue;
  }

  public get isSubmitDisabled(): boolean {
    return !(
      this.stringService.isString(this.searchValue) &&
      this.searchValue.trim().length > 0
    );
  }

  public get normalizedSearchValue(): string | null {
    return (
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this.numberService.convertToEnglishNumbers(this.searchValue?.trim()) ||
      null
    );
  }

  public get dynamicPlaceholder(): string {
    if (
      this.selectValue &&
      this.searchbarPlaceholderWithSelect?.[this.selectValue]
    ) {
      return `جستجو بر اساس ${this.searchbarPlaceholderWithSelect[this.selectValue]}`;
    }

    return this.searchbarPlaceholderWithoutSelect;
  }

  public onClearSearch(): void {
    this.searchValue = '';
    this.status = UkSearchBarStatus.NORMAL;
    this.shouldShowRemoveButton = false;
    this.changeDetectorRef.markForCheck();
  }

  public onClearAndSubmit(): void {
    this.onClearSearch();
    this.onSubmitSearch({showRemoveButton: false, resetData: true});
  }

  public onSubmitSearch(options: {
    showRemoveButton: boolean;
    resetData: boolean;
  }): void {
    this.shouldShowRemoveButton = options.showRemoveButton;

    this.ON_CLICK.emit([
      {
        searchValue: this.normalizedSearchValue,
        selectValue: this.selectValue,
      },
      options.resetData,
    ]);
  }

  public ngOnInit(): void {
    if (this.searchValue) {
      this.shouldShowRemoveButton = true;
    }
  }
}
