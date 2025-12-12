export interface UkResponse<T> {
  data: T;
  code: number;
  forbidden: boolean;
  message: string;
}
