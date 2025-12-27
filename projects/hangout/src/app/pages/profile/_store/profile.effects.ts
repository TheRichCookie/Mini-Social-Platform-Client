import {inject, Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {UkFollowService, UkProfileService} from '@utils/ui-kit/services';

@Injectable({providedIn: 'root'})
export class HangProfileEffects {
  private readonly actions = inject(Actions);
  private readonly profileService = inject(UkProfileService);
  private readonly followService = inject(UkFollowService);

  // public getProfile$ = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(PROFILE_ACTIONS.$GET_PROFILE_DETAIL),
  //     switchMap(({payload}) =>
  //       this.profileService.getProfile(payload.userId).pipe(
  //         map((user) =>
  //           PROFILE_ACTIONS.$GET_PROFILE_DETAIL_UPDATE({
  //             payload: {user, receivedTime: Date.now()},
  //           }),
  //         ),
  //         catchError((err) =>
  //           of(
  //             PROFILE_ACTIONS.$GET_PROFILE_ERROR({
  //               payload: {
  //                 error: {
  //                   message: err?.message ?? String(err),
  //                   receivedTime: Date.now(),
  //                 },
  //               },
  //             }),
  //           ),
  //         ),
  //       ),
  //     ),
  //   );
  // });

  // public getProfilePosts$ = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(PROFILE_ACTIONS.$GET_PROFILE_POSTS),
  //     switchMap(({payload}) =>
  //       this.profileService.getProfilePosts(payload.userId).pipe(
  //         map((posts) =>
  //           PROFILE_ACTIONS.$GET_PROFILE_POSTS_UPDATE({
  //             payload: {posts, receivedTime: Date.now()},
  //           }),
  //         ),
  //         catchError((err) =>
  //           of(
  //             PROFILE_ACTIONS.$GET_PROFILE_ERROR({
  //               payload: {
  //                 error: {
  //                   message: err?.message ?? String(err),
  //                   receivedTime: Date.now(),
  //                 },
  //               },
  //             }),
  //           ),
  //         ),
  //       ),
  //     ),
  //   );
  // });

  // public toggleFollow$ = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(PROFILE_ACTIONS.$TOGGLE_FOLLOW_PROFILE),
  //     switchMap(({payload}) =>
  //       this.followService.toggleFollow(payload.userId).pipe(
  //         map((user) =>
  //           PROFILE_ACTIONS.$TOGGLE_FOLLOW_PROFILE_UPDATE({
  //             payload: {user, receivedTime: Date.now()},
  //           }),
  //         ),
  //         catchError((err) =>
  //           of(
  //             PROFILE_ACTIONS.$GET_PROFILE_ERROR({
  //               payload: {
  //                 error: {
  //                   message: err?.message ?? String(err),
  //                   receivedTime: Date.now(),
  //                 },
  //               },
  //             }),
  //           ),
  //         ),
  //       ),
  //     ),
  //   );
  // });
}
