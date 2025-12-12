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
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {UkIconComponent} from '@utils/ui-kit/components';
import type {FilterTable} from '@utils/ui-kit/definitions';
import {
  FilterOperator,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import {UkInputComponent} from '@utils/ui-kit/forms';

export type UkTableSearchBoxStatus = 'ACTIVE' | 'EMPTY';

@Component({
  standalone: true,
  selector: 'uk-table-search-box',
  imports: [UkInputComponent, ReactiveFormsModule, UkIconComponent],
  templateUrl: './table-search-box.component.html',
  styleUrl: './table-search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkTableSearchBoxComponent),
      multi: true,
    },
  ],
})
export class UkTableSearchBoxComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public placeholder = 'جستجو';

  @Input()
  public columnName: string | null = null;

  public status: UkTableSearchBoxStatus = 'EMPTY';
  public searchControl = new FormControl<string>('', {nonNullable: true});

  public readonly UK_TYPE = UK_TYPE;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public onEnterPressed(): void {
    const value = this.searchControl.value?.trim() || '';

    this.status = value.length ? 'ACTIVE' : 'EMPTY';

    const filter: FilterTable = {
      column: this.columnName,
      operator: FilterOperator.Equal,
      minValue: value || null,
      maxValue: null,
    };

    this.changed(filter);
    this.touched();
    this.changeDetectorRef.markForCheck();
  }

  public onClearClicked(): void {
    this.searchControl.setValue('', {emitEvent: false});
    this.status = 'EMPTY';
    this.changed(null);
    this.touched();
    this.changeDetectorRef.markForCheck();
  }

  public writeValue(filter: FilterTable): void {
    if (filter?.minValue) {
      this.searchControl.setValue(filter.minValue as string, {
        emitEvent: false,
      });
      this.status = 'ACTIVE';
    } else {
      this.searchControl.setValue('', {emitEvent: false});
      this.status = 'EMPTY';
    }

    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable({emitEvent: false});
    } else {
      this.searchControl.enable({emitEvent: false});
    }
  }
}
