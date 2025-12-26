import {CommonModule} from '@angular/common';
import type {Provider} from '@angular/core';
import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import type {ControlValueAccessor} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';

const RADIO_BUTTON_GROUP_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UkRadioButtonGroupComponent),
  multi: true,
};

@Component({
  standalone: true,
  selector: 'uk-radio-button-group',
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_BUTTON_GROUP_VALUE_ACCESSOR],
})
export class UkRadioButtonGroupComponent implements ControlValueAccessor {
  private _internalValue: unknown;
  public changed!: (m: unknown) => void;
  public touched!: (m: unknown) => void;

  public onGroupChange = new Subject<unknown>();

  public get model(): unknown {
    return this._internalValue;
  }

  public writeValue(value: unknown): void {
    this._internalValue = value;
    this.onGroupChange.next(this._internalValue);
  }

  public registerOnChange(fn: (m: unknown) => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: (m: unknown) => void): void {
    this.touched = fn;
  }

  public emit(): void {
    this.onGroupChange.next(this._internalValue);
  }

  public set(value: unknown): void {
    this._internalValue = value;
    this.changed(this._internalValue);
    this.onGroupChange.next(this._internalValue);
  }
}
