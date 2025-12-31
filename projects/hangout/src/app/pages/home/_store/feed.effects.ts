import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkFeedService, UkLikeService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';

import type {
  CommonResponseViewModel,
  FeedPostModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import * as FEED_ACTION from './feed.actions';

@Injectable({providedIn: 'root'})
export class HangFeedEffects {
  private readonly actions = inject(Actions);
  private readonly feedService = inject(UkFeedService);
  private readonly likeService = inject(UkLikeService);

  public getFeed$ = createEffect(() => {
    return this.actions.pipe(
      ofType(FEED_ACTION.FEED_ACTIONS.$GET_FEED_POST),
      exhaustMap(() =>
        this.feedService.getFeed({page: 1, limit: 20}).pipe(
          switchMap((res: CommonResponseViewModel<FeedPostModel[]>) => {
            if (res.code === 200) {
              return of(
                FEED_ACTION.FEED_ACTIONS.$GET_FEED_UPDATE({
                  response: res.data ?? [],
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFeed$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFeed$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public toggleLike$ = createEffect(() => {
    return this.actions.pipe(
      ofType(FEED_ACTION.FEED_ACTIONS.$TOGGLE_LIKE_POST),
      exhaustMap((props) =>
        this.likeService.toggleLike(props.postId).pipe(
          switchMap(() => of(FEED_ACTION.FEED_ACTIONS.$GET_FEED_POST())),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'toggleLike$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
