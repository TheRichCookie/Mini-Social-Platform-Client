export interface UkResponse<T> {
  data?: T;
  code: number;
  message: string;
}
