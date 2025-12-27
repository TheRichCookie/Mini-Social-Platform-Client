import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import {Store} from '@ngrx/store';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkStarFieldComponent} from '@utils/ui-kit/components';
import {UkLoaderComponent} from '@utils/ui-kit/interceptors';
import {UkSeoService} from '@utils/ui-kit/services';
import {filter} from 'rxjs';

import {DEFAULT_HANG_ROUTE_DATA, type HangRouteData} from '../_/typed.route';

@Component({
  standalone: true,
  selector: 'hang-general-layout',
  imports: [
    RouterOutlet,
    RouterModule,
    UkLoaderComponent,
    UkStarFieldComponent,
  ],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangGeneralLayoutComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly seoService = inject(UkSeoService);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const CURRENT_ROUTE_DATA = this.getCurrentRouteData(
          this.activatedRoute,
        );

        this.seoService.update(CURRENT_ROUTE_DATA.seo);

        // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
        this.store.dispatch(
          APP_ACTIONS.UPDATE_LAYOUT_SHOW_HEADER({
            status: CURRENT_ROUTE_DATA.showHeader as boolean,
          }),
        );

        // this.store.dispatch(
        //   APP_ACTIONS.UPDATE_LAYOUT_({
        //     title: CURRENT_ROUTE_DATA.headerTitle as string,
        //   }),
        // );

        // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
        this.store.dispatch(
          APP_ACTIONS.UPDATE_LAYOUT_SHOW_TABS({
            status: CURRENT_ROUTE_DATA.showTabs as boolean,
          }),
        );
      });
  }

  private getCurrentRouteData(
    activatedRoute: ActivatedRoute,
    data?: HangRouteData,
  ): HangRouteData {
    data ??= DEFAULT_HANG_ROUTE_DATA;

    if (activatedRoute.firstChild) {
      if (activatedRoute.firstChild.snapshot.data) {
        // headerTitle
        if (
          Object.prototype.hasOwnProperty.call(
            activatedRoute.firstChild?.snapshot.data,
            'headerTitle',
          )
        ) {
          data.headerTitle =
            activatedRoute.firstChild.snapshot.data['headerTitle'];
        }

        // backAddress
        if (
          Object.prototype.hasOwnProperty.call(
            activatedRoute.firstChild?.snapshot.data,
            'backAddress',
          )
        ) {
          data.backAddress =
            activatedRoute.firstChild.snapshot.data['backAddress'];
        }

        // showHeader
        if (
          Object.prototype.hasOwnProperty.call(
            activatedRoute.firstChild?.snapshot.data,
            'showHeader',
          )
        ) {
          data.showHeader =
            activatedRoute.firstChild.snapshot.data['showHeader'];
        }

        // showTabs
        if (
          Object.prototype.hasOwnProperty.call(
            activatedRoute.firstChild.snapshot.data,
            'showTabs',
          )
        ) {
          data.showTabs = activatedRoute.firstChild.snapshot.data['showTabs'];
        }

        // showBack
        if (
          Object.prototype.hasOwnProperty.call(
            activatedRoute.firstChild.snapshot.data,
            'showBack',
          )
        ) {
          data.showBack = activatedRoute.firstChild.snapshot.data['showBack'];
        }

        // seo
        if (
          Object.prototype.hasOwnProperty.call(
            activatedRoute.firstChild.snapshot.data,
            'seo',
          )
        ) {
          data.seo = activatedRoute.firstChild.snapshot.data['seo'];
        } else {
          data.seo = undefined;
        }
      }

      return this.getCurrentRouteData(activatedRoute.firstChild, data);
    }

    return data;
  }
}
