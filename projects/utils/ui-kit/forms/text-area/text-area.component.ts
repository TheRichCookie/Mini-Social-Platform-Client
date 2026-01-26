import {CommonModule} from '@angular/common';
import type {AfterViewInit, ElementRef} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import type {ControlValueAccessor} from '@angular/forms';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {InputBorderColor} from '@utils/ui-kit/definitions';
import {
  DEFAULT,
  UIKIT_EMPTY_FUNCTION,
  UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT,
  UK_TYPE,
} from '@utils/ui-kit/definitions';
import {auditTime, Observable} from 'rxjs';

@Component({
  standalone: true,
  selector: 'uk-text-area',
  imports: [FormsModule, CommonModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UkTextAreaComponent),
      multi: true,
    },
  ],
})
export class UkTextAreaComponent
  implements ControlValueAccessor, AfterViewInit
{
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('textarea')
  public textarea!: ElementRef;

  @Input()
  public placeholder = '';

  @Input()
  public borderColor: InputBorderColor = DEFAULT.textArea.borderColor;

  @Input()
  public value?: unknown;

  public readonly UK_TYPE = UK_TYPE;
  public isDisabled = false;

  public changed = UIKIT_EMPTY_FUNCTION_UNI_ARGUMENT;
  public touched = UIKIT_EMPTY_FUNCTION;

  public onBlur(): void {
    this.touched();
  }

  public onInput(): void {
    this.changed(this.value);
    this.resize();
  }

  public resize(): void {
    const textarea = this.textarea.nativeElement as HTMLTextAreaElement;

    textarea.style.height = 'auto'; // reset
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  public resizeObserver$(element: Element): Observable<ResizeObserverEntry[]> {
    return new Observable((observer) => {
      const resizeObserver = new ResizeObserver((entries) => {
        observer.next(entries);
      });

      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    });
  }

  public writeValue(value: boolean): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: () => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  public ngAfterViewInit(): void {
    this.resizeObserver$(this.textarea.nativeElement)
      .pipe(auditTime(0), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.resize();
      });
  }
}
