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
            if (res.code === 200 && res.data) {
              return of(
                PROFILE_ACTIONS.$GET_PROFILE_DETAIL_UPDATE({
                  userId: props.userId ?? '',
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

  public patchProfile$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PROFILE_ACTIONS.$PATCH_PROFILE_DETAIL),
      exhaustMap((props) =>
        this.profileService.updateProfile(props.body).pipe(
          switchMap((res) => {
            if (res.code === 200 && res.data) {
              return of(
                PROFILE_ACTIONS.$PATCH_PROFILE_DETAIL_UPDATE({
                  body: props.body,
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'patchProfile$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'patchProfile$',
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
        this.profileService.getUserProfilePosts(props.userId, props.query).pipe(
          switchMap((res) => {
            if ((res.code === 200, res.data)) {
              return of(
                PROFILE_ACTIONS.$GET_PROFILE_POSTS_UPDATE({
                  userId: props.userId,
                  query: props.query,
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

  public getFollowers$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PROFILE_ACTIONS.$GET_PROFILE_FOLLOWERS),
      exhaustMap((props) =>
        this.followService.getFollowers(props.userId, props.query).pipe(
          switchMap((res) => {
            if ((res.code === 200, res.data)) {
              return of(
                PROFILE_ACTIONS.$GET_PROFILE_FOLLOWERS_UPDATE({
                  userId: props.userId,
                  query: props.query,
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFollowers$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFollowers$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });

  public getFollowing$ = createEffect(() => {
    return this.actions.pipe(
      ofType(PROFILE_ACTIONS.$GET_PROFILE_FOLLOWING),
      exhaustMap((props) =>
        this.followService.getFollowing(props.userId, props.query).pipe(
          switchMap((res) => {
            if ((res.code === 200, res.data)) {
              return of(
                PROFILE_ACTIONS.$GET_PROFILE_FOLLOWING_UPDATE({
                  userId: props.userId,
                  query: props.query,
                  response: res.data,
                  receivedTime: Date.now(),
                }),
              );
            }

            return of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFollowing$',
                error: String(res.code),
              }),
            );
          }),
          catchError((error) =>
            of(
              APP_ACTIONS.UPDATE_HTTP_FAIL({
                timestamp: Date.now(),
                methodName: 'getFollowing$',
                error: error,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
