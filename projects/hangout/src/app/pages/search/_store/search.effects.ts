import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkFollowService, UkUserService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';

import type {
  CommonResponseViewModel,
  SearchUsersDataModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import * as SEARCH_ACTION from './search.actions';

@Injectable({providedIn: 'root'})
export class HangSearchEffects {
  private readonly actions = inject(Actions);
  private readonly userService = inject(UkUserService);
  private readonly followService = inject(UkFollowService);

  public getSearch$ = createEffect(() => {
    return this.actions.pipe(
      ofType(SEARCH_ACTION.SEARCH_ACTIONS.$GET_SEARCH_USERS_POST),
      exhaustMap((props) =>
        this.userService.searchUsers(props.query || '').pipe(
          map((res: CommonResponseViewModel<SearchUsersDataModel>) => {
            if (res.code === 200) {
              return SEARCH_ACTION.SEARCH_ACTIONS.$GET_SEARCH_USERS_UPDATE({
                response: res.data?.users ?? [],
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

  public toggleFollow$ = createEffect(() => {
    return this.actions.pipe(
      ofType(SEARCH_ACTION.SEARCH_ACTIONS.$TOGGLE_FOLLOW_USER),
      exhaustMap((props) =>
        this.followService.toggleFollow(props.userId).pipe(
          switchMap(() =>
            of(
              SEARCH_ACTION.SEARCH_ACTIONS.$GET_SEARCH_USERS_POST({
                query: '',
              }),
            ),
          ),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'toggleFollow$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
