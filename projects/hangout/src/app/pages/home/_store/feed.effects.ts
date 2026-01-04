import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkFeedService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, map, of} from 'rxjs';

import type {
  CommonResponseViewModel,
  FeedPaginationData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import {FEED_ACTIONS} from './feed.actions';

@Injectable({providedIn: 'root'})
export class HangFeedEffects {
  private readonly actions = inject(Actions);
  private readonly feedService = inject(UkFeedService);

  public getFeeds$ = createEffect(() => {
    return this.actions.pipe(
      ofType(FEED_ACTIONS.$GET_FEEDS),
      exhaustMap((props) =>
        this.feedService.getFeed(props.query).pipe(
          map((res: CommonResponseViewModel<FeedPaginationData>) => {
            if (res.code === 200 && res.data) {
              return FEED_ACTIONS.$GET_FEEDS_UPDATE({
                query: props.query,
                response: res.data,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'getFeeds$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFeeds$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
