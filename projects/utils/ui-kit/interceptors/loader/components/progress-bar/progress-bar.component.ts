// https://github.com/rawatanimesh/angular-progress-bar

import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';

import { UkAnimationComponent } from '../../../../animations/animation/animation.component';
import { UK_TYPE } from '../../../../definitions';

@Component({
  standalone: true,
  selector: 'uk-progress-bar',
  imports: [CommonModule, UkAnimationComponent],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkProgressBarComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  public barType: 'ANIMATION' | 'LINEAR' | 'RADIAL' = 'ANIMATION';

  @Input()
  public progress = 0; // between 0 ad 100

  @Input()
  public size = 9;

  @Input()
  public showLabel = true;

  @Input()
  public color = '#0e90d2';

  @Input()
  public colorBg = '#D3D3D3';

  @Input()
  public depth = 2;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public BAR_TYPE = this.barType;
  public readonly UK_TYPE = UK_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected barProperties: any = null!;

  public get leftBorder(): string {
    const color =
      this.barProperties.progress > 0
        ? this.barProperties.color
        : this.barProperties.secondColor;
    const thickness = this.barProperties.radial.depth / 16;

    return `${color} ${thickness}em solid`;
  }

  public get leftRotation(): string {
    return `rotate(${this.barProperties.progress * 3.6}deg)`;
  }

  public ngOnInit(): void {
    this.barProperties = {
      barType: this.barType,
      color: this.color,
      secondColor: this.colorBg,
      progress: this.progress, // between 0 and 100
      linear: {
        depth: 22,
        stripped: true,
        active: true,
        label: {
          enable: this.showLabel,
          value: 'Linear Bar',
          color: '#fff',
          fontSize: 15,
          showPercentage: true,
        },
      },
      radial: {
        depth: this.depth, // max 8
        size: this.size,
        label: {
          enable: this.showLabel,
          color: '#09608c',
        },
      },
    };
    this.changeDetectorRef.markForCheck();
  }
}
