export interface UkConfigApiService {
  AUTH: string;
  COMMENTS: string;
  FEED: string;
  LIKES: string;
  POSTS: string;
  PROFILE: string;
}

export enum UkConfigApiServices {
  APP = 'app',
  AUTH = 'auth',
  COMMENTS = 'comments',
  FEED = 'feed',
  LIKES = 'likes',
  POSTS = 'posts',
  PROFILE = 'profile',
}

export type ConfigApiServices = `${UkConfigApiServices}`;
