import {DestroyRef, inject, Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {Subject, timer} from 'rxjs';

import {UkRouteAnimationType} from './route-animation-types';

@Injectable({
  providedIn: 'root',
})
export class UkRouteAnimationService {
  private readonly router = inject(Router);

  private _animationType = UkRouteAnimationType.FADE;
  public animationType = new Subject<UkRouteAnimationType>();

  public destroyRef = inject(DestroyRef);

  public setBasePageAnimationDirection(type: UkRouteAnimationType): void {
    this._animationType = type;
  }

  public getBasePageAnimationDirection(): UkRouteAnimationType {
    return this._animationType;
  }

  public navigateByUrl(
    url: string,
    routeAnimationType?: UkRouteAnimationType,
  ): void {
    const direction = routeAnimationType ?? this._animationType;

    this.setBasePageAnimationDirection(direction);

    this.animationType.next(direction);

    timer(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_i: unknown) => {
        void this.router.navigate([url]);
      });
  }
}
