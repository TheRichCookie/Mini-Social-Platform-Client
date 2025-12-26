export interface UkConfigApiService {
  AUTH: string;
  COMMENTS: string;
  FEED: string;
  LIKES: string;
  POSTS: string;
  PROFILE: string;
  FOLLOW: string;
  USERS: string;
  NOTIFICATIONS: string;
}

export enum UkConfigApiServices {
  APP = 'app',
  AUTH = 'auth',
  COMMENTS = 'comments',
  FEED = 'feed',
  LIKES = 'likes',
  POSTS = 'posts',
  PROFILE = 'profile',
  FOLLOW = 'follow',
  USERS = 'users',
  NOTIFICATIONS = 'notifications',
}

export type ConfigApiServices = `${UkConfigApiServices}`;
