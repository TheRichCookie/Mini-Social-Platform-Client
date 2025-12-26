import { CommonModule } from '@angular/common';
import type { AfterViewInit, OnDestroy } from '@angular/core';
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
import { UkTextComponent } from '@utils/ui-kit/components';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import { UkRadioButtonGroupComponent } from '@utils/ui-kit/forms';
import type { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'uk-radio-button',
  imports: [CommonModule, FormsModule, UkTextComponent],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkRadioButtonComponent),
      multi: true,
    },
  ],
})
export class UkRadioButtonComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _id: unknown = `radio-button-${String(Math.floor(Math.random() * 1000) + new Date().getTime())}`;
  private readonly radioButtonGroup = inject(UkRadioButtonGroupComponent, {
    optional: true,
  });

  private subscription: Subscription = null!;

  @Input()
  public name = 'radio-button-group';

  @Input()
  public value: unknown;

  @Input()
  public disabled = false;

  @Input()
  public hasLabel = false;

  public readonly UK_TYPE = UK_TYPE;

  public destroyRef = inject(DestroyRef);
  public internalValue!: unknown;
  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  @Input()
  public set id(v: unknown) {
    this._id = v;

    if (this.radioButtonGroup) {
      this.value = v;
      this.changeDetectorRef.markForCheck();
    }
  }

  public get id(): unknown {
    return this._id;
  }

  public onChange(): void {
    this.changed(this.internalValue);
    this.radioButtonGroup?.set(this.id);
  }

  public writeValue(value: boolean): void {
    this.internalValue = value;
  }

  public registerOnChange(fn: (x: unknown) => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  public ngAfterViewInit(): void {
    if (this.radioButtonGroup) {
      this.subscription = this.radioButtonGroup.onGroupChange
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((id: unknown) => {
          this.internalValue = id;
          this.changeDetectorRef.markForCheck();
        });
      this.radioButtonGroup.emit();
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
