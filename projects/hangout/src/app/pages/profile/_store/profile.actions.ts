import {createActionGroup, props} from '@ngrx/store';
import type {
  PaginatedUsersData,
  UpdateProfileRequest,
  UserModel,
  UserProfileData,
} from '@utils/ui-kit/definitions';

export const PROFILE_DETAIL_ACTIONS = createActionGroup({
  source: 'PROFILE',
  events: {
    $GET_PROFILE_DETAIL: props<{userId?: string}>(),
    $GET_PROFILE_DETAIL_UPDATE: props<{
      userId: string;
      response: UserProfileData;
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

    $DELETE_PROFILE_POST: props<{
      postId: string;
    }>(),
    $DELETE_PROFILE_POST_UPDATE: props<{
      postId: string;
      receivedTime: number;
    }>(),

    $POST_PROFILE_TOGGLE_FOLLOW: props<{userId: string}>(),
    $POST_PROFILE_TOGGLE_FOLLOW_UPDATE: props<{
      userId: string;
      receivedTime: number;
    }>(),
  },
});

export const PROFILE_EDIT_ACTIONS = createActionGroup({
  source: 'PROFILE',
  events: {
    $PATCH_PROFILE_DETAIL: props<{
      body: UpdateProfileRequest;
    }>(),
    $PATCH_PROFILE_DETAIL_UPDATE: props<{
      body: UpdateProfileRequest;
      response: UserModel;
      receivedTime: number;
    }>(),
  },
});

export const PROFILE_FOLLOW_ACTIONS = createActionGroup({
  source: 'PROFILE',
  events: {
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
