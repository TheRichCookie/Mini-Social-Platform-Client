import {CommonModule} from '@angular/common';
import type {AfterViewInit, OnDestroy} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import type {ControlValueAccessor} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UkTextComponent} from '@utils/ui-kit/components';
import {
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import type {Subscription} from 'rxjs';

import {UkCheckBoxGroupComponent} from '../check-box-group/check-box-group.component';

@Component({
  standalone: true,
  selector: 'uk-check-box',
  imports: [CommonModule, FormsModule, UkTextComponent],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkCheckBoxComponent),
      multi: true,
    },
  ],
})
export class UkCheckBoxComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private _id: unknown = `radio-button-${String(Math.floor(Math.random() * 1000) + new Date().getTime())}`;
  private readonly checkboxGroup = inject(UkCheckBoxGroupComponent, {
    optional: true,
  });

  private subscription: Subscription = null!;

  @Input()
  public name = `check-box-group-${this.id}`;

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

    if (this.checkboxGroup) {
      this.internalValue = v;
      this.changeDetectorRef.markForCheck();
    }
  }

  public get id(): unknown {
    return this._id;
  }

  public onChange(): void {
    const VAL = this.value;

    this.changed(VAL);
    this.checkboxGroup?.update(this.id);
  }

  public writeValue(value: boolean): void {
    this.value = value;
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public ngAfterViewInit(): void {
    if (this.checkboxGroup) {
      this.subscription = this.checkboxGroup.onGroupChange
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((ids: unknown[]) => {
          if (ids?.length >= 0) {
            this.value = ids.includes(this.internalValue);
            this.changeDetectorRef.markForCheck();
          }
        });
      this.checkboxGroup.emit();
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
