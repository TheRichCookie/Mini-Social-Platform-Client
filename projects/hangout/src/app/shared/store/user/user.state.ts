import type {CommonErrorResponse} from '@utils/ui-kit/definitions';

export interface HangUserState {
  userData: {
    receivedTime: number;
    error: CommonErrorResponse;
  };
}
