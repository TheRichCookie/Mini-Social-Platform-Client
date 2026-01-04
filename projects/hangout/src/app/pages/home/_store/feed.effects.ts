import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {
  UkCommentService,
  UkFeedService,
  UkLikeService,
} from '@utils/ui-kit/services';
import {catchError, exhaustMap, map, of} from 'rxjs';

import type {
  CommentModel,
  CommentPaginationData,
  CommonResponseViewModel,
  FeedPaginationData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';
import {COMMENT_ACTIONS, FEED_ACTIONS, LIKE_ACTIONS} from './feed.actions';

@Injectable({providedIn: 'root'})
export class HangFeedEffects {
  private readonly actions = inject(Actions);
  private readonly feedService = inject(UkFeedService);
  private readonly likeService = inject(UkLikeService);
  private readonly commentService = inject(UkCommentService);

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

  public toggleLike$ = createEffect(() => {
    return this.actions.pipe(
      ofType(LIKE_ACTIONS.$TOGGLE_LIKE),
      exhaustMap((props) =>
        this.likeService.toggleLike(props.postId).pipe(
          map((res: CommonResponseViewModel<void>) => {
            if (res.code === 200 && res.data) {
              return LIKE_ACTIONS.$TOGGLE_LIKE_UPDATE({
                postId: props.postId,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'toggleLike$',
              error: String(res.code),
            });
          }),
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

  public getComments$ = createEffect(() => {
    return this.actions.pipe(
      ofType(COMMENT_ACTIONS.$GET_COMMENTS),
      exhaustMap((props) =>
        this.commentService.getPostComments(props.postId, props.query).pipe(
          map((res: CommonResponseViewModel<CommentPaginationData>) => {
            if (res.code === 200 && res.data) {
              return COMMENT_ACTIONS.$GET_COMMENTS_UPDATE({
                postId: props.postId,
                query: props.query,
                response: res.data,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'getComments$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getComments$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public addComment$ = createEffect(() => {
    return this.actions.pipe(
      ofType(COMMENT_ACTIONS.$ADD_COMMENT),
      exhaustMap((props) =>
        this.commentService.addComment(props.postId, props.body).pipe(
          map((res: CommonResponseViewModel<CommentModel>) => {
            if (res.code === 200 && res.data) {
              return COMMENT_ACTIONS.$ADD_COMMENT_UPDATE({
                postId: props.postId,
                body: props.body,
                response: res.data,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'addComments$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'addComments$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public deleteComment$ = createEffect(() => {
    return this.actions.pipe(
      ofType(COMMENT_ACTIONS.$DELETE_COMMENT),
      exhaustMap((props) =>
        this.commentService.deleteComment(props.commentId).pipe(
          map((res: CommonResponseViewModel<void>) => {
            if (res.code === 200 && res.data) {
              return COMMENT_ACTIONS.$DELETE_COMMENT_UPDATE({
                commentId: props.commentId,
                receivedTime: Date.now(),
              });
            }

            return APP_ACTIONS.UPDATE_HTTP_FAIL({
              timestamp: Date.now(),
              methodName: 'deleteComment$',
              error: String(res.code),
            });
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'deleteComment$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
