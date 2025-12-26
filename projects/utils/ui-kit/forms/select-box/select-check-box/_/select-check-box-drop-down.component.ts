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
import {UkScrollComponent} from '@utils/ui-kit/arrangements';
import {UkButtonComponent, UkIconComponent} from '@utils/ui-kit/components';
import {UK_TYPE} from '@utils/ui-kit/definitions';
import {UkCheckBoxComponent} from '@utils/ui-kit/forms/check-box/check-box.component';
import {UkCheckBoxGroupComponent} from '@utils/ui-kit/forms/check-box-group/check-box-group.component';
import {UkInputComponent} from '@utils/ui-kit/forms/public-api';

@Component({
  standalone: true,
  selector: 'uk-select-check-box-drop-down',
  imports: [
    CommonModule,
    FormsModule,
    UkCheckBoxComponent,
    UkCheckBoxGroupComponent,
    UkButtonComponent,
    UkScrollComponent,
    UkIconComponent,
    UkInputComponent,
  ],
  templateUrl: './select-check-box-drop-down.component.html',
  styleUrls: ['./select-check-box-drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkSelectCheckBoxDropDownComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public options: Array<Record<string, number | string> | number | string> = [];

  @Input()
  public values: Array<
    Record<string, number | string> | number | string | null | undefined
  > = [];

  @Input()
  public bindLabelKey = '';

  @Input()
  public bindValueKey = '';

  @Input()
  public searchPlaceholder = 'عنوان جستجو';

  @Input()
  public searchProperty = '';

  @Output()
  public readonly SUBMIT = new EventEmitter();

  public readonly UK_TYPE = UK_TYPE;
  public isAllSelected = false;
  public searchValue = '';
  public tempItems: Array<Record<string, number | string> | number | string> =
    [];

  public getOptionLabel(
    option:
      | Record<string, number | string>
      | number
      | string
      | null
      | undefined,
  ): string {
    if (option === null || option === undefined) {
      return '';
    }

    if (typeof option === 'string') {
      return option;
    }

    if (typeof option === 'number') {
      return String(option);
    }

    if (this.bindLabelKey && typeof option === 'object') {
      return String(option[this.bindLabelKey]);
    }

    return JSON.stringify(option);
  }

  public getOptionValue(
    option:
      | Record<string, number | string>
      | number
      | string
      | null
      | undefined,
  ): Record<string, number | string> | number | string | null | undefined {
    if (option === null || option === undefined) {
      return null;
    }

    if (typeof option === 'string' || typeof option === 'number') {
      return option;
    }

    if (this.bindValueKey && typeof option === 'object') {
      return String(option[this.bindValueKey]);
    }

    return option;
  }

  public onSubmit(): void {
    this.SUBMIT.emit(this.values);
  }

  public toggleSelectAll(event: Event | MouseEvent): void {
    event.preventDefault();

    const allValues = this.options.map((option) => this.getOptionValue(option));

    if (this.isAllSelected) {
      this.isAllSelected = false;
      this.values = [];
    } else {
      this.isAllSelected = true;
      this.values = [...allValues];
    }

    this.changeDetectorRef.markForCheck();
  }

  public updateSelectAllState(): void {
    if (!this.values.length) {
      this.isAllSelected = false;
      this.changeDetectorRef.markForCheck();

      return;
    }

    const allValues = this.options.map((option) => this.getOptionValue(option));

    this.isAllSelected = allValues.every((value) =>
      this.values.includes(value),
    );

    this.changeDetectorRef.markForCheck();
  }

  public onSearchValueChange(value: string): void {
    if (this.searchProperty) {
      if (!this.tempItems.length) {
        this.tempItems = this.options;
      }

      if (value) {
        this.options = this.tempItems.filter((item) => {
          if (
            typeof item === 'object' &&
            item !== null &&
            this.searchProperty in item
          ) {
            const propValue = String(
              (item as Record<string, unknown>)[this.searchProperty],
            );

            return propValue.includes(value);
          }

          return false;
        });
      } else {
        this.options = this.tempItems;
      }

      this.changeDetectorRef.markForCheck();
    }
  }

  public onClearSearchValue(): void {
    this.searchValue = '';
    this.changeDetectorRef.markForCheck();
  }

  public ngOnInit(): void {
    this.updateSelectAllState();
  }
}
