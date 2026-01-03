import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkPostService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';

import {POST_ACTIONS} from './post.actions';

@Injectable({providedIn: 'root'})
export class HangPostEffects {
  private readonly actions = inject(Actions);
  private readonly postService = inject(UkPostService);

  public addPost$ = createEffect(() => {
    return this.actions.pipe(
      ofType(POST_ACTIONS.$ADD_POST),
      exhaustMap((props) =>
        this.postService.addPost(props.body).pipe(
          switchMap((res) => {
            if (res.code === 201 && res.data) {
              return of(
                POST_ACTIONS.$ADD_POST_UPDATE({
                  body: props.body,
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'addPost$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'addPost$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
