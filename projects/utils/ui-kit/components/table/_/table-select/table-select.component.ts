import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import type {ControlValueAccessor} from '@angular/forms';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import type {FilterTable} from '@utils/ui-kit/definitions';
import {
  FilterOperator,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import {UkSelectComponent} from '@utils/ui-kit/forms';

@Component({
  standalone: true,
  selector: 'uk-table-select',
  imports: [UkSelectComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './table-select.component.html',
  styleUrl: './table-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkTableSelectComponent),
      multi: true,
    },
  ],
})
export class UkTableSelectComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public items: unknown[] = [];

  @Input()
  public placeholder = 'انتخاب کنید';

  @Input()
  public bindLabel = 'name';

  @Input()
  public bindValue = 'id';

  @Input()
  public columnName: string | null = null;

  public selectedValue: unknown = null;
  public readonly UK_TYPE = UK_TYPE;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public onValueChange(value: unknown): void {
    this.selectedValue = value;

    const filter: FilterTable | null =
      value !== null
        ? {
            column: this.columnName,
            operator: FilterOperator.Equal,
            minValue: value as number | string,
            maxValue: null,
          }
        : null;

    this.changed(filter);
    this.touched();
    this.changeDetectorRef.markForCheck();
  }

  public writeValue(value: FilterTable | null): void {
    this.selectedValue = value?.minValue ?? null;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
