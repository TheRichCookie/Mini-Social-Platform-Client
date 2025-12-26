import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as APP_ACTIONS from '@store/app/app.action';

import type {HangAppLoading} from './app-loading.interface';

@Injectable({
  providedIn: 'root',
})
export class HangLoadingService {
  private readonly store = inject(Store);

  public app(part: HangAppLoading, status: false | true): void {
    this.store.dispatch(
      APP_ACTIONS.LOADING({
        part,
        status,
      }),
    );
  }
}
