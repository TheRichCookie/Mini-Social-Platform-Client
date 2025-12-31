import {createActionGroup, props} from '@ngrx/store';
import type {
  PaginatedUsersData,
  UpdateProfileRequest,
  UserModel,
  UserProfileData,
} from '@utils/ui-kit/definitions';

export const PROFILE_ACTIONS = createActionGroup({
  source: 'PROFILE',
  events: {
    $GET_PROFILE_DETAIL: props<{userId?: string}>(),
    $GET_PROFILE_DETAIL_UPDATE: props<{
      userId: string;
      response: UserProfileData;
      receivedTime: number;
    }>(),

    $PATCH_PROFILE_DETAIL: props<{
      body: UpdateProfileRequest;
    }>(),
    $PATCH_PROFILE_DETAIL_UPDATE: props<{
      body: UpdateProfileRequest;
      response: UserModel;
      receivedTime: number;
    }>(),

    $GET_PROFILE_POSTS: props<{
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_PROFILE_POSTS_UPDATE: props<{
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
      response: PaginatedUsersData;
      receivedTime: number;
    }>(),

    $GET_PROFILE_FOLLOWERS: props<{
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_PROFILE_FOLLOWERS_UPDATE: props<{
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
      response: PaginatedUsersData;
      receivedTime: number;
    }>(),

    $GET_PROFILE_FOLLOWING: props<{
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_PROFILE_FOLLOWING_UPDATE: props<{
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
      response: PaginatedUsersData;
      receivedTime: number;
    }>(),
  },
});
