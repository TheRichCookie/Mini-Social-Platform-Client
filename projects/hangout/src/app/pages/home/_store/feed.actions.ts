import {createActionGroup, emptyProps, props} from '@ngrx/store';

import type {
  AddCommentRequest,
  CommentModel,
  CommentPaginationData,
  FeedPaginationData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export const FEED_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $GET_FEEDS: props<{
      query: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_FEEDS_UPDATE: props<{
      query: {
        page: number;
        limit: number;
      };
      response: FeedPaginationData;
      receivedTime: number;
    }>(),
  },
});

export const LIKE_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $TOGGLE_LIKE: props<{
      postId: string;
    }>(),
    $TOGGLE_LIKE_UPDATE: props<{
      postId: string;
      receivedTime: number;
    }>(),
  },
});

export const COMMENT_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $GET_COMMENTS: props<{
      postId: string;
      query: {
        page: number;
        limit: number;
      };
    }>(),
    $GET_COMMENTS_UPDATE: props<{
      postId: string;
      query: {
        page: number;
        limit: number;
      };
      response: CommentPaginationData;
      receivedTime: number;
    }>(),

    $ADD_COMMENT: props<{
      postId: string;
      body: AddCommentRequest;
    }>(),
    $ADD_COMMENT_UPDATE: props<{
      postId: string;
      body: AddCommentRequest;
      response: CommentModel;
      receivedTime: number;
    }>(),

    $DELETE_COMMENT: props<{
      commentId: string;
    }>(),
    $DELETE_COMMENT_UPDATE: props<{
      commentId: string;
      receivedTime: number;
    }>(),
  },
});

export const FEED_RESET_ACTIONS = createActionGroup({
  source: 'FEED',
  events: {
    $RESET_FEEDS: emptyProps(),
    $RESET_COMMENTS: emptyProps(),
  },
});
