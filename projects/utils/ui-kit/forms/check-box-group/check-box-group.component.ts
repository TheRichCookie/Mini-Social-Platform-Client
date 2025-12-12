import {CommonModule} from '@angular/common';
import type {Provider} from '@angular/core';
import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import type {ControlValueAccessor} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';

const CHECK_BOX_GROUP_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UkCheckBoxGroupComponent),
  multi: true,
};

@Component({
  standalone: true,
  selector: 'uk-check-box-group',
  imports: [CommonModule, FormsModule],
  templateUrl: './check-box-group.component.html',
  styleUrls: ['./check-box-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECK_BOX_GROUP_VALUE_ACCESSOR],
})
export class UkCheckBoxGroupComponent implements ControlValueAccessor {
  private _internalValue: unknown[] = [];

  public changed!: (m: unknown) => void;
  public touched!: (m: unknown) => void;

  public onGroupChange = new Subject<unknown[]>();

  public get model(): unknown[] {
    return this._internalValue;
  }

  public writeValue(value: unknown[]): void {
    this._internalValue = value;
    this.onGroupChange.next(this._internalValue);
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public set(value: unknown[]): void {
    this._internalValue = value;
    this.changed(this._internalValue);
    this.onGroupChange.next(value);
  }

  public emit(): void {
    this.onGroupChange.next(this._internalValue);
  }

  public update(value: unknown): void {
    const INDEX = this._internalValue.indexOf(value);

    if (INDEX < 0) {
      this._internalValue.push(value);
    } else {
      this._internalValue.splice(INDEX, 1);
    }

    this.changed(this._internalValue);
  }
}
