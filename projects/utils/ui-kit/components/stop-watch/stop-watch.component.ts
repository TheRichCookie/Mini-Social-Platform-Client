import type { AfterViewInit } from '@angular/core';
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
import { UK_TYPE } from '@utils/ui-kit/definitions';
import type { Subscription } from 'rxjs';
import { interval, take } from 'rxjs';

import { UkTextComponent } from '../public-api';

@Component({
  standalone: true,
  selector: 'uk-stop-watch',
  imports: [UkTextComponent],
  templateUrl: './stop-watch.component.html',
  styleUrl: './stop-watch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkStopWatchComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _startTime = 0;

  @Input()
  public duration = 60;

  @Output()
  public readonly REACHED = new EventEmitter<null>();

  public destroyRef = inject(DestroyRef);
  public readonly UK_TYPE = UK_TYPE;

  public value: number = null!;
  public interval$!: Subscription;

  @Input()
  public set startTime(value: number) {
    this._startTime = value;
    this.calculate();
  }

  public get startTime(): number {
    return this._startTime;
  }

  public ngAfterViewInit(): void {
    this.calculate();
  }

  private calculate(): void {
    const INTERVAL_TIME = 1000;
    const REMAINED_TIME = Math.round(Date.now() / 1000 - this.startTime / 1000);
    const INTERVAL_COUNT = this.duration - REMAINED_TIME + 1;

    if (INTERVAL_COUNT === 0) {
      this.onReached();
    } else {
      const INTERVAL$ = interval(INTERVAL_TIME).pipe(take(INTERVAL_COUNT));

      this.interval$ = INTERVAL$.pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe((value) => {
        this.value = this.duration - REMAINED_TIME - value;
        this.changeDetectorRef.markForCheck();

        if (this.value === 0) {
          this.onReached();
        }
      });
    }
  }

  private onReached(): void {
    this.REACHED.emit();
  }
}
