import type {
  PaginatedUsersData,
  PostPaginationData,
  UpdateProfileRequest,
  UserModel,
  UserProfileData,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangProfileState {
  profile: {
    get: {
      request: {
        userId?: string;
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
    follow: {
      request: {
        userId: string;
      };
      receivedTime: number;
    };
  };
  posts: {
    get: {
      request: {
        userId: string;
        query?: {
          page: number;
          limit: number;
        };
      };
      response: PostPaginationData;
      receivedTime: number;
    };
    delete: {
      request: {postId: string};
      receivedTime: number;
    };
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
