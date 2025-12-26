import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UkBooleanType } from '../../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkAppAnimationService {
  private readonly appAnimationSubject = new Subject<UkBooleanType>();
  private appAnimation: UkBooleanType = null!;

  public init(appAnimation: UkBooleanType): void {
    this.appAnimation = appAnimation;
    this.appAnimationSubject.next(appAnimation);
  }

  public turnSoundEffectOn(): void {
    this.appAnimation = UkBooleanType.TRUE;
    this.appAnimationSubject.next(this.appAnimation);
  }

  public turnSoundEffectOff(): void {
    this.appAnimation = UkBooleanType.FALSE;
    this.appAnimationSubject.next(this.appAnimation);
  }
}
