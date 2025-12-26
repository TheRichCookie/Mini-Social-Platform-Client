import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import type {
  ControlValueAccessor,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import type {
  BooleanType,
  CrudMode,
  SelectBgColor,
  SelectBorderColor,
  SelectBorderRadius,
  SelectFgColor,
  SelectMarginRight,
} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-select',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkSelectComponent),
      multi: true,
    },
  ],
})
export class UkSelectComponent implements ControlValueAccessor {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public bgColor: SelectBgColor = DEFAULT.select.bgColor;

  @Input()
  public fgColor: SelectFgColor = DEFAULT.select.fgColor;

  @Input()
  public borderColor: SelectBorderColor = DEFAULT.select.borderColor;

  @Input()
  public borderRadius: SelectBorderRadius = DEFAULT.select.borderRadius;

  @Input()
  public multiSelect: BooleanType = DEFAULT.select.multiSelect;

  @Input()
  public title = '';

  @Input()
  public subTitle = '';

  @Input()
  public placeholder = 'انتخاب کنید';

  @Input()
  public multiple = false;

  @Input()
  public parentForm: FormGroup = null!;

  @Input()
  public fieldName = '';

  @Input()
  public isSilentDisabled = false;

  @Input()
  public hasBorder = true;

  @Input()
  public hasFocus = false;

  @Input()
  public items: unknown[] = [];

  @Input()
  public bindValue = 'id';

  @Input()
  public bindLabel = 'name';

  @Input()
  public isInSelectSearch = false;

  @Input()
  public hasIconBefore = false;

  @Input()
  public modalTitle = '';

  @Input()
  public crudMode: CrudMode = DEFAULT.input.crudMode;

  @Input()
  public searchPlaceholder = 'عنوان جستجو';

  @Input()
  public searchProperty = '';

  @Input()
  public firstSelection = true;

  @Input()
  public marginRight: SelectMarginRight = DEFAULT.select.marginRight;

  public readonly UK_TYPE = UK_TYPE;
  public disabled = false;
  public innerValue: unknown = null!;
  public destroyRef = inject(DestroyRef);
  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public get formControl(): FormControl | null {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  public writeValue(value: string): void {
    this.innerValue = value;
    this.changeDetectorRef.markForCheck();
  }

  public onChange(value: unknown): void {
    this.changed(value);
  }

  public onTouche(): void {
    this.touched();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }
}
