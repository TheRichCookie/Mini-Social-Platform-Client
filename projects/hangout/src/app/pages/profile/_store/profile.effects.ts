import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as APP_ACTIONS from '@store/app/app.action';
import {UkFollowService, UkProfileService} from '@utils/ui-kit/services';
import {catchError, exhaustMap, of, switchMap} from 'rxjs';

import {PROFILE_ACTIONS} from './profile.actions';

@Injectable({providedIn: 'root'})
export class HangProfileEffects {
  private readonly actions = inject(Actions);
  private readonly profileService = inject(UkProfileService);
  private readonly followService = inject(UkFollowService);

  public getProfile$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PROFILE_ACTIONS.$GET_PROFILE_DETAIL),
      exhaustMap((props) =>
        this.profileService.getProfile(props.userId).pipe(
          switchMap((res) => {
            if (res.code === 200) {
              return of(
                PROFILE_ACTIONS.$GET_PROFILE_DETAIL_UPDATE({
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getProfile$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getProfile$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public getProfilePosts$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PROFILE_ACTIONS.$GET_PROFILE_POSTS),
      exhaustMap((props) =>
        this.profileService.getUserProfilePosts(props.userId).pipe(
          switchMap((res) => {
            if (res.code === 200) {
              return of(
                PROFILE_ACTIONS.$GET_PROFILE_POSTS_UPDATE({
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getProfilePosts$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getProfilePosts$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
