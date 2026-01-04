import {inject, Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkAuthenticateService} from '@utils/ui-kit/services';

@Injectable({
  providedIn: 'root',
})
export class HangAppService {
  private readonly store = inject(Store);
  private readonly authenticateService = inject(UkAuthenticateService);

  public init(): void {
    this.authenticateService.onTokenChange$
      .pipe(takeUntilDestroyed())
      .subscribe((token: string) => {
        if (token) {
          this.appPreparation();
        }
      });
  }

  public appPreparation(): void {
    this.store.dispatch(APP_ACTIONS.GET_HAS_NOTIFICATION());
  }
}
