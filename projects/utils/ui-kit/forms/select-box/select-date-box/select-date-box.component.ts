import { CommonModule, NgClass } from '@angular/common';
import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UkIconComponent, UkTextComponent } from '@utils/ui-kit/components';
import { UK_TYPE } from '@utils/ui-kit/definitions';
import type {
  UkDateRangeDataModel,
  UkDateRangeOptionModel,
} from '@utils/ui-kit/definitions/components/select-date-box/select-date-box.interface';
import { UkDateRangeTypes } from '@utils/ui-kit/definitions/components/select-date-box/select-date-box.interface';
import { UkDateService, UkOverlayService } from '@utils/ui-kit/services';
import { take } from 'rxjs';

import { UkSelectDateDropdownComponent } from './_/select-date-drop-down.component';

@Component({
  standalone: true,
  selector: 'uk-select-date-box',
  imports: [UkIconComponent, NgClass, CommonModule, UkTextComponent],
  templateUrl: './select-date-box.component.html',
  styleUrl: './select-date-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UkOverlayService],
})
export class UkSelectDateBoxComponent implements OnInit {
  private readonly overlayService = inject(UkOverlayService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly dateService = inject(UkDateService);
  private readonly destroyRef = inject(DestroyRef);
  private _displayDate = '';

  @Input()
  public label = 'بازه زمانی';

  @Input()
  public startDate: number | string | null | undefined = null;

  @Input()
  public toDate: number | string | null | undefined = null;

  @Input()
  public rangeDate: unknown = null;

  @Input()
  public hasClearButton = false;

  @Output()
  public readonly ON_DATE_CHANGE =
    new EventEmitter<UkDateRangeDataModel | null>();

  @Output()
  public readonly ON_RANGE_DATE_CHANGE =
    new EventEmitter<UkDateRangeTypes | null>();

  @Output()
  public readonly rangeDateChange = new EventEmitter<unknown>();

  @Output()
  public readonly startDateChange = new EventEmitter<
    number | string | null | undefined
  >();

  @Output()
  public readonly toDateChange = new EventEmitter<
    number | string | null | undefined
  >();

  public readonly UK_TYPE = UK_TYPE;
  public rangeDateOptions: UkDateRangeOptionModel[] = [
    {
      id: UkDateRangeTypes.TODAY,
      text: 'امروز',
    },
    {
      id: UkDateRangeTypes.LAST_SEVEN_DAYS,
      text: 'یک هفته اخیر',
    },
    {
      id: UkDateRangeTypes.LAST_MONTH,
      text: 'یک ماه اخیر',
    },
    {
      id: UkDateRangeTypes.CALENDAR,
      text: 'بازه ۳۱ روزه',
    },
  ];

  public open = false;

  public get displayDate(): string {
    return this._displayDate;
  }

  public set displayDate(option: unknown | null) {
    if (!option) {
      this._displayDate = this.label;
    } else {
      const OPTION = this.rangeDateOptions.find((o) => option === o.id);

      this._displayDate = `${this.label}: ${OPTION?.text ?? 'نامشخص'}`;
    }
  }

  public openCalendarModal(dropdownBoxEL: HTMLElement): void {
    this.open = true;

    const INPUTS = new Map<string, unknown>([
      ['startDate', this.startDate],
      ['toDate', this.toDate],
      ['rangeDateOptions', this.rangeDateOptions],
      ['rangeDate', this.rangeDate],
    ]);

    const OVERLAY = this.overlayService.open(UkSelectDateDropdownComponent, {
      hasBackdrop: false,
      positionInfo: dropdownBoxEL,
      inputs: INPUTS,
    });

    OVERLAY.overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => {
        this.open = false;

        this.changeDetectorRef.markForCheck();
        OVERLAY.overlayRef.dispose();
      });

    OVERLAY.componentRef.instance.ON_CALENDAR_SUBMIT.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((date: UkDateRangeDataModel | null) => {
      this.open = false;

      const beforeMidnightDate = (23 * 60 + 59) * 60 * 1000;

      this.startDate = date?.startDate;
      this.toDate = date?.toDate ? date.toDate + beforeMidnightDate : null;

      this.startDateChange.emit(this.startDate);
      this.toDateChange.emit(this.toDate);
      this.ON_DATE_CHANGE.emit();

      this.changeDetectorRef.markForCheck();
      OVERLAY.overlayRef.dispose();
    });

    OVERLAY.componentRef.instance.ON_RANGE_DATE_TYPE_CHANGE.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((rangeDate: UkDateRangeTypes | null) => {
      this.open = false;
      this.rangeDate = rangeDate;
      this.displayDate = rangeDate;

      this.rangeDateChange.emit(rangeDate);

      if (rangeDate !== UkDateRangeTypes.CALENDAR) {
        this.clearDateOnly();
        this.ON_RANGE_DATE_CHANGE.emit();
        OVERLAY.overlayRef.dispose();
      }

      this.changeDetectorRef.markForCheck();
    });
  }

  public clearEverything(event: MouseEvent): void {
    event.stopPropagation();

    this.startDate = null;
    this.toDate = null;
    this.rangeDate = null;
    this.displayDate = null;

    this.startDateChange.emit(this.startDate);
    this.toDateChange.emit(this.toDate);
    this.rangeDateChange.emit(this.rangeDate);
    this.ON_DATE_CHANGE.emit();

    this.changeDetectorRef.markForCheck();
  }

  public clearDateOnly(): void {
    this.startDate = null;
    this.toDate = null;

    this.startDateChange.emit(this.startDate);
    this.toDateChange.emit(this.toDate);
  }

  public hasValue(): boolean {
    return this.rangeDate !== null && this.rangeDate !== undefined;
  }

  public ngOnInit(): void {
    this.displayDate = this.rangeDate;
  }
}
