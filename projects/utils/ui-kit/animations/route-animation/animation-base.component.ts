import type {OnDestroy} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import type {Subscription} from 'rxjs';

import {basePageAnimations} from './animations';
import {UkRouteAnimationService} from '@utils/ui-kit/animations';

@Component({
  standalone: true,
  selector: 'uk-animation-base',
  template: '',
  styleUrls: ['./animation-base-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [basePageAnimations],
})
export class UkAnimationBaseComponent implements OnDestroy {
  // private readonly _navigationSubscription: Subscription;
  @HostBinding('@basePageAnimation')
  protected containerAnimation = 'fade';

  protected routeAnimationService = inject(UkRouteAnimationService);

  constructor() {
    this.containerAnimation =
      this.routeAnimationService.getBasePageAnimationDirection();
    // this._navigationSubscription = this.routeAnimationService.animationType
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((direction: RouteAnimationType) =>
    //     this.setAnimationDirection(direction),
    //   );
  }

  public ngOnDestroy(): void {
    // if (this._navigationSubscription) {
    //   this._navigationSubscription.unsubscribe();
    // }
  }

  // public setAnimationDirection(direction: RouteAnimationType): void {
  //   if (direction) {
  //     this.containerAnimation = direction;
  //   }
  // }
  //
  // public navigateByUrl(data: {
  //   url: string;
  //   direction?: RouteAnimationType;
  // }): void {
  //   this.routeAnimationService.navigateByUrl(data.url, data.direction);
  // }
}
