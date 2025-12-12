import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {UkBooleanType} from '../../../definitions';

@Injectable({
  providedIn: 'root',
})
export class UkAppSoundEffectService {
  private readonly appSoundEffectSubject = new Subject<UkBooleanType>();
  private appSoundEffect: UkBooleanType = null!;

  public status(): boolean {
    if (this.appSoundEffect === UkBooleanType.FALSE) {
      return false;
    }

    return true;
  }

  public init(appSoundEffect: UkBooleanType): void {
    this.appSoundEffect = appSoundEffect;
    this.appSoundEffectSubject.next(appSoundEffect);
  }

  public turnSoundEffectOn(): void {
    this.appSoundEffect = UkBooleanType.TRUE;
    this.appSoundEffectSubject.next(this.appSoundEffect);
  }

  public turnSoundEffectOff(): void {
    this.appSoundEffect = UkBooleanType.FALSE;
    this.appSoundEffectSubject.next(this.appSoundEffect);
  }
}
