import {CommonModule} from '@angular/common';
import type {AfterViewInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import {UkButtonGroupComponent} from '../../../../arrangements/button-group/button-group.component';
import {UkModalFrameComponent} from '../../../../arrangements/modal-frame/modal-frame.component';
import {UkButtonComponent} from '../../../../components/button/button.component';
import type {UkWheelSelector} from '../../../../components/wheel-selector/wheel-selector.component';
import {UkWheelSelectorComponent} from '../../../../components/wheel-selector/wheel-selector.component';
import {UK_TYPE} from '../../../../definitions/public-api';
import {
  UkAlertService,
  type UkDate,
  UkDateService,
  UkNumberService,
} from '../../../../services';

@Component({
  standalone: true,
  selector: 'uk-date-select-overlay',
  imports: [
    UkModalFrameComponent,
    UkWheelSelectorComponent,
    UkButtonComponent,
    UkButtonGroupComponent,
    CommonModule,
  ],
  templateUrl: './date-select-overlay.component.html',
  styleUrl: './date-select-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkDateSelectOverlayComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly dateService = inject(UkDateService);
  private readonly numberService = inject(UkNumberService);
  private readonly alertService = inject(UkAlertService);

  private readonly yearsLength = 100;
  private readonly currentUKDJalali = this.dateService.getCurrentUKDJalali();
  private _ukDate: UkDate = this.currentUKDJalali;

  @Output()
  public readonly ON_CLOSE = new EventEmitter<null>();

  @Output()
  public readonly ON_CANCEL = new EventEmitter<null>();

  @Output()
  public readonly ON_SUBMIT = new EventEmitter<UkDate>();

  @ViewChild('wheelSelect')
  public wheelSelect!: UkWheelSelectorComponent;

  public show = false;

  public persianYears: string[] = [];
  public persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];

  public persianDays = Array.from({length: 31}, (_, i) => `${i + 1}`);

  public readonly UK_TYPE = UK_TYPE;
  public title = 'انتخاب تاریخ';
  public data: UkWheelSelector[] = [
    {
      onClick: (gIndex: number, iIndex: number): void => {
        this.onClickYear(gIndex, iIndex);
      },
      currentIndex: 0,
      list: this.persianYears,
    },
    {
      onClick: (gIndex: number, iIndex: number): void => {
        this.onClickMonth(gIndex, iIndex);
      },
      currentIndex: 0,
      list: this.persianMonths,
    },
    {
      onClick: (gIndex: number, iIndex: number): void => {
        this.onClickDay(gIndex, iIndex);
      },
      currentIndex: 0,
      list: this.persianDays,
    },
  ];

  constructor() {
    this.prepareYears();
    this.tuneWheelSelector();
  }

  @Input()
  public set ukDate(v: UkDate) {
    this._ukDate = v;
    this.tuneWheelSelector();
  }

  public get ukDate(): UkDate {
    return this._ukDate;
  }

  public onClickYear(_gIndex: number, _iIndex: number): void {}
  public onClickMonth(_gIndex: number, _iIndex: number): void {}
  public onClickDay(_gIndex: number, _iIndex: number): void {}

  public prepareYears(): void {
    const CURRENT_YEAR = this.currentUKDJalali.year;
    const LENGTH = this.yearsLength;
    const START_YEAR = CURRENT_YEAR - LENGTH + 1;

    this.persianYears = Array.from(
      {length: LENGTH},
      (_, i) => `${START_YEAR + i}`,
    );
    this.data[0].list = this.persianYears;
    this.changeDetectorRef.markForCheck();
  }

  public onClose(): void {
    this.ON_CANCEL.emit();
  }

  public onCancel(): void {
    this.ON_CANCEL.emit();
  }

  public tuneWheelSelector(): void {
    const yearIndex = this.persianYears.findIndex(
      (y) => Number(y) === this.ukDate.year,
    );

    this.data[0].currentIndex = yearIndex;
    this.data[1].currentIndex = this.ukDate.month;
    this.data[2].currentIndex = this.ukDate.day - 1;
  }

  public onSubmit(): void {
    const selectedIndexes = this.wheelSelect.getCurrentIndexList();
    const jDate: UkDate = {
      year: Number(this.persianYears[selectedIndexes[0]]),
      month: selectedIndexes[1],
      day: Number(this.persianDays[selectedIndexes[2]]),
    };

    if (this.dateService.isValidJDate(jDate.year, jDate.month, jDate.day)) {
      this.ON_SUBMIT.emit(jDate);
    } else {
      this.alertService.error('تاریخ معتبر نمیباشد');
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.show = true;
      this.changeDetectorRef.markForCheck();
    }, 0);
  }
}
