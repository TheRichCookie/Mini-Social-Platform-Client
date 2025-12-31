import type {
  PaginatedUsersData,
  UpdateProfileRequest,
  UserModel,
  UserProfileData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangProfileState {
  profile: {
    get: {
      request: {
        userId: string;
      };
      response: UserProfileData;
      receivedTime: number;
    };
    patch: {
      request: {
        body: UpdateProfileRequest;
      };
      response: UserModel;
      receivedTime: number;
    };
  };
  posts: {
    request: {
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
    };
    response: PaginatedUsersData;
    receivedTime: number;
  };
  followers: {
    request: {
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
    };
    response: PaginatedUsersData;
    receivedTime: number;
  };
  following: {
    request: {
      userId: string;
      query?: {
        page: number;
        limit: number;
      };
    };
    response: PaginatedUsersData;
    receivedTime: number;
  };
}
