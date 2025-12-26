import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UkLoggerPart, UkLoggerService } from '@utils/ui-kit/services';

import { UkLoaderService } from '../../service/loader/loader.service';
import { UkProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  standalone: true,
  selector: 'uk-loader',
  imports: [CommonModule, UkProgressBarComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkLoaderComponent {
  private readonly loaderService = inject(UkLoaderService);
  private readonly loggerService = inject(UkLoggerService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private startTime = 0;
  protected loading = true;
  protected percents: number[] = [];
  constructor() {
    this.loaderService.isLoading.pipe(takeUntilDestroyed()).subscribe((v) => {
      if (v.totalRequests > 0) {
        this.loading = true;

        if (this.startTime === 0) {
          this.startTime = Date.now();
        }

        // check if percents size is equals with requests size
        if (v.totalRequests > this.percents.length) {
          for (let i = this.percents.length; i < v.totalRequests; i++) {
            this.percents.push(null!);
          }
        }

        this.changeDetectorRef.markForCheck();
      } else {
        const NOW = Date.now();

        this.loading = false;
        this.percents = [];
        this.changeDetectorRef.markForCheck();
        this.loggerService.info(
          UkLoggerPart.INIT,
          `loader takes ${NOW - this.startTime} ms`,
        );
        this.startTime = 0;
      }

      this.percents[v.currentRequestIndex] = v.percent as number;
    });
  }
}
