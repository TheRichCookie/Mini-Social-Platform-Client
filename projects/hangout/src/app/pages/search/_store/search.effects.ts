import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import type {
  CommonResponseViewModel,
  SearchUsersDataModel,
} from '@utils/ui-kit/definitions';
import {UkFollowService, UkUserService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, map, of} from 'rxjs';

import {SEARCH_ACTIONS} from './search.actions';

@Injectable({providedIn: 'root'})
export class HangSearchEffects {
  private readonly actions = inject(Actions);
  private readonly userService = inject(UkUserService);
  private readonly followService = inject(UkFollowService);

  public getSearch$ = createEffect(() => {
    return this.actions.pipe(
      ofType(SEARCH_ACTIONS.$GET_SEARCH_USERS),
      exhaustMap((props) =>
        this.userService.searchUsers(props.query).pipe(
          map((res: CommonResponseViewModel<SearchUsersDataModel>) => {
            if (res.code === 200 && res.data) {
              return SEARCH_ACTIONS.$GET_SEARCH_USERS_UPDATE({
                query: props.query,
                response: res.data,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'getSearch$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getSearch$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
