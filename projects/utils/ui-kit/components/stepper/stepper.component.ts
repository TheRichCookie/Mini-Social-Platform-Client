import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {UkScrollComponent} from '@utils/ui-kit/arrangements';
import {UkShapeIconComponent, UkTextComponent} from '@utils/ui-kit/components';
import type {
  BooleanType,
  UkStepperItem,
  UkStepperItems,
} from '@utils/ui-kit/definitions';
import {DEFAULT, UK_TYPE, UkBooleanType} from '@utils/ui-kit/definitions';

@Component({
  standalone: true,
  selector: 'uk-stepper',
  imports: [
    CommonModule,
    UkScrollComponent,
    UkShapeIconComponent,
    UkTextComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkStepperComponent {
  @Input()
  public isReadonly: boolean = DEFAULT.stepper.isReadonly;

  @Input()
  public activeIndex = 0;

  @Input()
  public steps: UkStepperItems = [];

  @Input()
  public showScrollbar: BooleanType = UkBooleanType.TRUE;

  @Output()
  public readonly CLICK_ON_STEP = new EventEmitter<number>();

  public readonly UK_TYPE = UK_TYPE;

  public trackOptionByFn(index: number, _option: UkStepperItem): number {
    return index;
  }

  public onActiveIndexChange(stepperIndex: number): void {
    this.CLICK_ON_STEP.emit(stepperIndex);
  }
}
