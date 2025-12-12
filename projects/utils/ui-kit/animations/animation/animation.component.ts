import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import type {AnimationItem} from 'lottie-web';
import type {
  AnimationOptions,
  BMCompleteEvent,
  BMCompleteLoopEvent,
} from 'ngx-lottie';
import {LottieComponent} from 'ngx-lottie';

import type {BooleanType} from '../../definitions';
import {UkBooleanType} from '../../definitions';
import {UkLoggerPart, UkLoggerService} from '../../services';

@Component({
  standalone: true,
  selector: 'uk-animation',
  imports: [LottieComponent],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UkAnimationComponent {
  private readonly loggerService = inject(UkLoggerService);
  private readonly playQueue: Array<() => void> = [];
  private _path = 'uk-images/animations/simple-dot.json';
  private _loop: BooleanType = UkBooleanType.TRUE;
  private _autoplay: BooleanType = UkBooleanType.FALSE;
  private _betweenPause: number = null!;

  @Input()
  public animationScale = 1;

  @Input()
  public autoReset: BooleanType = UkBooleanType.FALSE;

  public animationItem: AnimationItem | undefined;
  public animationOptions: AnimationOptions = {
    path: this.path,
    loop: this.loop === UkBooleanType.TRUE,
    autoplay: this.autoplay === UkBooleanType.TRUE,
  };

  @Input()
  public set path(v: string) {
    this._path = v;
    this.animationOptions = {
      ...this.animationOptions,
      path: v,
    };
  }

  public get path(): string {
    return this._path;
  }

  @Input()
  public set loop(v: BooleanType) {
    this._loop = v;
    this.animationOptions = {
      ...this.animationOptions,
      loop: v === UkBooleanType.TRUE,
    };
  }

  public get loop(): BooleanType {
    return this._loop;
  }

  @Input()
  public set autoplay(v: BooleanType) {
    this._autoplay = v;
    this.animationOptions = {
      ...this.animationOptions,
      autoplay: v === UkBooleanType.TRUE,
    };
  }

  public get autoplay(): BooleanType {
    return this._autoplay;
  }

  @Input()
  public set betweenPause(v: number) {
    this._betweenPause = v;
  }

  public get betweenPause(): number {
    return this._betweenPause;
  }

  public animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;

    while (this.playQueue.length > 0) {
      const NEXT_ACTION = this.playQueue.shift();

      if (NEXT_ACTION) {
        NEXT_ACTION();
      }
    }

    if (this._betweenPause !== null) {
      setInterval(() => {
        animationItem.goToAndPlay(0, true);
      }, this._betweenPause);
    }
  }

  public loopComplete(bMCompleteLoopEvent: BMCompleteLoopEvent): void {
    this.loggerService.info(UkLoggerPart.INIT, 'loop completed', [
      bMCompleteLoopEvent,
    ]);
  }

  public complete(bMCompleteEvent: BMCompleteEvent): void {
    this.loggerService.info(UkLoggerPart.INIT, 'completed', [bMCompleteEvent]);
  }

  public play(name?: string): void {
    const PLAY_ACTION = (): void => {
      if (this.animationItem) {
        if (this.autoReset === UkBooleanType.TRUE) {
          this.animationItem.goToAndStop(0, true);
        }

        this.animationItem.play(name);
      }
    };

    if (this.animationItem) {
      PLAY_ACTION();
    } else {
      this.playQueue.push(PLAY_ACTION);
    }
  }

  public pause(): void {
    if (this.animationItem) {
      this.animationItem.pause();
    }
  }

  public stop(name?: string): void {
    if (this.animationItem) {
      this.animationItem.stop(name);
    }
  }

  public goToAndStop(frame: number): void {
    this.animationItem?.goToAndStop(frame, true);
  }

  public playSegments(startFrame: number, endFrame: number): void {
    this.animationItem?.playSegments([startFrame, endFrame], true);
  }
}
