export interface UkConfigApiService {
  AUTH: string;
}

export enum UkConfigApiServices {
  APP = 'app',
  AUTH = 'auth',
}

export type ConfigApiServices = `${UkConfigApiServices}`;
