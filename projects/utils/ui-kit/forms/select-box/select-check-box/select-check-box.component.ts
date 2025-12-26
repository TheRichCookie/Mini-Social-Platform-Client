import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { ControlValueAccessor } from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UkIconComponent, UkTextComponent } from '@utils/ui-kit/components';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import { UkOverlayService } from '@utils/ui-kit/services';
import { take } from 'rxjs';

import { UkSelectCheckBoxDropDownComponent } from './_/select-check-box-drop-down.component';

@Component({
  standalone: true,
  selector: 'uk-select-check-box',
  imports: [FormsModule, UkIconComponent, UkTextComponent, NgClass],
  templateUrl: './select-check-box.component.html',
  styleUrl: './select-check-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UkOverlayService,

    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkSelectCheckBoxComponent),
      multi: true,
    },
  ],
})
export class UkSelectCheckBoxComponent implements ControlValueAccessor {
  private readonly overlayService = inject(UkOverlayService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public label = 'انتخاب گزینه';

  @Input()
  public options: unknown[] = [];

  @Input()
  public bindLabelKey = '';

  @Input()
  public bindValueKey = '';

  @Input()
  public searchProperty = '';

  @Input()
  public hasClearButton = true;

  public readonly UK_TYPE = UK_TYPE;
  public isDisabled = false;

  public open = false;
  public values: unknown[] = [];

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public destroyRef = inject(DestroyRef);

  public openDropdown(dropdownBoxEL: HTMLElement): void {
    if (!this.isDisabled) {
      this.open = true;
      const PREV_VALUES = JSON.stringify(this.values);

      const INPUTS = new Map<string, unknown>([
        ['options', this.options],
        ['values', this.values],
        ['bindLabelKey', this.bindLabelKey],
        ['bindValueKey', this.bindValueKey],
        ['searchProperty', this.searchProperty],
      ]);

      const overlay = this.overlayService.open(
        UkSelectCheckBoxDropDownComponent,
        {
          hasBackdrop: false,
          positionInfo: dropdownBoxEL,
          inputs: INPUTS,
        },
      );

      overlay.overlayRef
        .backdropClick()
        .pipe(take(1))
        .subscribe(() => {
          this.values = JSON.parse(PREV_VALUES);
          this.open = false;
          this.changeDetectorRef.markForCheck();
          overlay.overlayRef.dispose();
        });

      overlay.componentRef.instance.SUBMIT.pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe((values: unknown[]) => {
        const CURRENT_VALUE = JSON.stringify(values);

        if (CURRENT_VALUE !== PREV_VALUES) {
          this.values = values;
          this.onChange([...values]);
        }

        this.open = false;
        this.changeDetectorRef.markForCheck();
        overlay.overlayRef.dispose();
      });
    }
  }

  public getOptionLabel(): string {
    const VALUES_COUNT = this.values.length;

    if (!VALUES_COUNT) {
      return `${this.label}`;
    }

    const FIRST_SELECTED_OPTION = this.options.find((option) => {
      if (
        option !== null &&
        option !== undefined &&
        typeof option === 'object'
      ) {
        return (
          (option as Record<string, unknown>)[this.bindValueKey] ===
          this.values[0]
        );
      }

      return '';
    });

    const VALUE_LABEL =
      FIRST_SELECTED_OPTION && typeof FIRST_SELECTED_OPTION === 'object'
        ? (FIRST_SELECTED_OPTION as Record<string, unknown>)[this.bindLabelKey]
        : 'نامشخص';

    if (VALUES_COUNT === 1) {
      return `${this.label}: ${VALUE_LABEL}`;
    }

    if (VALUES_COUNT === this.options.length) {
      return `${this.label}: همه`;
    }

    return `${this.label}: ${VALUE_LABEL} و ${VALUES_COUNT - 1} ${this.label} دیگر`;
  }

  public hasValue(): boolean {
    return this.values.length > 0;
  }

  public onClear(event: MouseEvent): void {
    event.stopPropagation();
    this.values = [];
    this.onChange([]);
    this.changeDetectorRef.markForCheck();
  }

  public writeValue(values: unknown[]): void {
    this.values = Array.isArray(values) ? values : [];
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  public onChange(values: unknown[]): void {
    this.changed(values);
  }
}
