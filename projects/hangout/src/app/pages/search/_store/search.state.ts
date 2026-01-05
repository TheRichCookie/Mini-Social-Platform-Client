import type {SearchUsersDataModel} from '@utils/ui-kit/definitions';

export interface HangSearchState {
  search: {
    request: {
      query: {
        q?: string;
        page: number;
        limit: number;
      };
    };
    response: SearchUsersDataModel;
    receivedTime: number;
  };
}
