import type {UserSearchModel} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangSearchState {
  query: string | undefined;
  response: UserSearchModel[];
  receivedTime: number | undefined;
  error: {
    receivedTime: number | undefined;
    message: string | undefined;
  };
}