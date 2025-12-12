import {CommonModule} from '@angular/common';
import type {OnDestroy} from '@angular/core';
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
import type {ImageObjectFit, UkFileType} from '@utils/ui-kit/definitions';
import {DEFAULT} from '@utils/ui-kit/definitions';
import type {Subscription} from 'rxjs';

import {UkAlertService, UkLoggerService} from '../../services';

export interface UkSecureSource {
  sourceType: UkFileType;
  fileId: number;
}

@Component({
  standalone: true,
  selector: 'uk-image',
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkImageComponent implements OnDestroy {
  private readonly loggerService = inject(UkLoggerService);
  private readonly alertService = inject(UkAlertService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly secureUrl: string = null!;
  private _secureSource: UkSecureSource = null!;
  private readonly imageDownloadSubscription: Subscription = null!;

  @Input()
  public source: string = DEFAULT.image.source;

  @Input()
  public objectFit: ImageObjectFit = DEFAULT.image.objectFit;

  @Input()
  public alt = '';

  @Input()
  public canDownload = false;

  @Input()
  public fileName = 'file';

  @Output()
  public readonly SECURE_SOURCE = new EventEmitter<string>();

  public destroyRef = inject(DestroyRef);

  public get secureSource(): UkSecureSource {
    return this._secureSource;
  }

  @Input()
  public set secureSource(v: UkSecureSource) {
    this._secureSource = v;
  }

  public downloadImage(): void {
    if (this.secureUrl && this.canDownload) {
      const A = document.createElement('a');

      A.href = this.secureUrl;
      A.download = `${this.fileName}-${this.secureSource.fileId}.jpg`;
      A.click();
      window.URL.revokeObjectURL(this.secureUrl);
      A.remove();
    }
  }

  public ngOnDestroy(): void {
    if (this.imageDownloadSubscription) {
      this.imageDownloadSubscription.unsubscribe();
    }
  }
}
