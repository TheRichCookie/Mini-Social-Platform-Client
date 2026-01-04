/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthSignUpRequest {
  /** @example "johndoe" */
  username: string;
  /**
   * @format email
   * @example "john@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "P@ssw0rd!"
   */
  password: string;
}

export interface AuthSignInRequest {
  /**
   * @format email
   * @example "john@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "P@ssw0rd!"
   */
  password: string;
}

export interface AuthOtpVerificationRequest {
  /** @example "60f7b8e6a2b4c12d34e5f678" */
  userId: string;
  /** @example "123456" */
  otp: string;
}

export interface CommonResponseViewModel {
  /** @example 200 */
  code?: number;
  /** @example "نتیجه عملیات" */
  message?: string;
  /** @example {} */
  data?: object;
}

export interface SignUpDataModel {
  /** @example "60f7b8e6a2b4c12d34e5f678" */
  userId: string;
}

export type SignUpResponse = CommonResponseViewModel & {
  data?: SignUpDataModel;
};

export interface SignInDataModel {
  /** @example "60f7b8e6a2b4c12d34e5f678" */
  userId: string;
}

export type SignInResponse = CommonResponseViewModel & {
  data?: SignInDataModel;
};

export interface OtpVerificationDataModel {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." */
  token: string;
}

export type OtpVerificationResponse = CommonResponseViewModel & {
  data?: OtpVerificationDataModel;
};

export interface CommentModel {
  /** @example "60f7b8e6a2b4c12d34e5f678" */
  _id?: string;
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  userId?: string;
  /** @example "60f7b8e6a2b4c12d34e5f67a" */
  postId?: string;
  /** @example "نظر عالی بود" */
  text?: string;
  /**
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  createdAt?: string;
}

export interface AddCommentRequest {
  /** @example "نظر عالی بود" */
  text: string;
}

export type AddCommentResponse = CommonResponseViewModel & {
  data?: CommentModel;
};

export type CommentArrayResponse = CommonResponseViewModel & {
  data?: CommentModel[];
};

export interface AuthorModel {
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  _id?: string;
  /** @example "johndoe" */
  username?: string;
  /** @example "john@example.com" */
  email?: string;
  /** @example "https://example.com/pic.jpg" */
  profilePic?: string;
}

export interface FeedPostModel {
  /** @example "60f7b8e6a2b4c12d34e5f67a" */
  _id?: string;
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  userId?: string;
  /** @example "این یک پست جدید است" */
  content?: string;
  author?: AuthorModel;
  /** @example 12 */
  likeCount?: number;
  /** @example true */
  isLikedByUser?: boolean;
  /**
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  createdAt?: string;
}

export interface FeedPaginationData {
  items?: FeedPostModel[];
  /** @example 120 */
  totalCount?: number;
}

export type FeedResponse = CommonResponseViewModel & {
  data?: FeedPaginationData;
};

export interface UserModel {
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  _id?: string;
  /** @example "johndoe" */
  username?: string;
  /** @example "john@example.com" */
  email?: string;
  /** @example "https://example.com/avatar.jpg" */
  avatar?: string;
  /** @example "خوش آمدید به من" */
  bio?: string;
  /** @example "علوم کامپیوتر" */
  major?: string;
  /**
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  createdAt?: string;
}

export interface PaginatedUsersData {
  items?: UserModel[];
  /** @example 25 */
  totalCount?: number;
}

export type PaginatedUsersResponse = CommonResponseViewModel & {
  data?: PaginatedUsersData;
};

export interface LikesCountModel {
  /** @example 5 */
  likes?: number;
}

export type LikesCountResponse = CommonResponseViewModel & {
  data?: LikesCountModel;
};

export interface SenderModel {
  /** @example "60f7b8e6a2b4c12d34e5f67a" */
  _id?: string;
  /** @example "johndoe" */
  username?: string;
  /** @example "https://example.com/avatar.jpg" */
  avatar?: string;
}

export interface NotificationModel {
  /** @example "60f7b8e6a2b4c12d34e5f678" */
  _id?: string;
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  userId?: string;
  senderId?: SenderModel;
  /** @example "like" */
  type?: "like" | "comment" | "follow";
  /** @example "60f7b8e6a2b4c12d34e5f67b" */
  postId?: string;
  /** @example false */
  isRead?: boolean;
  /**
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  createdAt?: string;
}

export interface NotificationPaginationData {
  items?: NotificationModel[];
  /** @example 42 */
  totalCount?: number;
}

export type NotificationResponse = CommonResponseViewModel & {
  data?: NotificationPaginationData;
};

export interface PostModel {
  /** @example "60f7b8e6a2b4c12d34e5f67a" */
  _id?: string;
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  userId?: string;
  /** @example "این یک پست جدید است" */
  content?: string;
  /**
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  createdAt?: string;
}

export interface CreatePostRequest {
  /** @example "این یک پست جدید است" */
  content: string;
}

export interface PostPaginationData {
  items?: PostModel[];
  /** @example 120 */
  totalCount?: number;
}

export type PaginatedPostResponse = CommonResponseViewModel & {
  data?: PostPaginationData;
};

export type PostArrayResponse = CommonResponseViewModel & {
  data?: PostModel[];
};

export type CreatePostResponse = CommonResponseViewModel & {
  data?: PostModel;
};

export interface UserProfileData {
  user?: UserModel;
  /** @example 12 */
  followers?: number;
  /** @example 5 */
  following?: number;
  /** @example false */
  isMe?: boolean;
  /** @example true */
  isFollowing?: boolean;
}

export type UserProfileResponse = CommonResponseViewModel & {
  data?: UserProfileData;
};

export interface UpdateProfileRequest {
  /** @example "خوش آمدید به من" */
  bio?: string;
  /** @example "https://example.com/avatar.jpg" */
  avatar?: string;
  /** @example "علوم کامپیوتر" */
  major?: string;
}

export interface ProfilePostsPaginationData {
  items?: PostModel[];
  /** @example 25 */
  totalCount?: number;
}

export type ProfilePostsResponse = CommonResponseViewModel & {
  data?: ProfilePostsPaginationData;
};

export interface UserSearchModel {
  /** @example "60f7b8e6a2b4c12d34e5f679" */
  _id?: string;
  /** @example "johndoe" */
  username?: string;
  /** @example "https://example.com/pic.jpg" */
  profilePic?: string;
}

export interface SearchUsersDataModel {
  users?: UserSearchModel[];
  /** @example 25 */
  total?: number;
  /** @example 3 */
  totalPages?: number;
}

export type SearchUsersResponse = CommonResponseViewModel & {
  data?: SearchUsersDataModel;
};

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:5000/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Hangout API
 * @version 1.0.0
 * @baseUrl http://localhost:5000/api
 *
 * API documentation for the Hangout application
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name SignUpCreate
     * @summary Create a new user account
     * @request POST:/auth/signUp
     */
    signUpCreate: (data: AuthSignUpRequest, params: RequestParams = {}) =>
      this.request<SignUpResponse, CommonResponseViewModel>({
        path: `/auth/signUp`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name SignInCreate
     * @summary Sign in and request an OTP to be emailed to the user
     * @request POST:/auth/signIn
     */
    signInCreate: (data: AuthSignInRequest, params: RequestParams = {}) =>
      this.request<SignInResponse, CommonResponseViewModel>({
        path: `/auth/signIn`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name OtpVerificationCreate
     * @summary Verify OTP and receive a JWT token
     * @request POST:/auth/otpVerification
     */
    otpVerificationCreate: (
      data: AuthOtpVerificationRequest,
      params: RequestParams = {},
    ) =>
      this.request<OtpVerificationResponse, CommonResponseViewModel>({
        path: `/auth/otpVerification`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  comments = {
    /**
     * No description
     *
     * @tags Comments
     * @name CommentsCreate
     * @summary Add a comment to a post
     * @request POST:/comments/{postId}
     * @secure
     */
    commentsCreate: (
      postId: string,
      data: AddCommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<AddCommentResponse, CommonResponseViewModel>({
        path: `/comments/${postId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsDetail
     * @summary Get all comments for a post
     * @request GET:/comments/{postId}
     */
    commentsDetail: (
      postId: string,
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommentArrayResponse, CommonResponseViewModel>({
        path: `/comments/${postId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsDelete
     * @summary Delete a comment
     * @request DELETE:/comments/{commentId}
     * @secure
     */
    commentsDelete: (commentId: string, params: RequestParams = {}) =>
      this.request<CommonResponseViewModel, CommonResponseViewModel>({
        path: `/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  feed = {
    /**
     * No description
     *
     * @tags Feed
     * @name FeedList
     * @summary Get feed posts (paginated)
     * @request GET:/feed
     * @secure
     */
    feedList: (
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FeedResponse, CommonResponseViewModel>({
        path: `/feed`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  follow = {
    /**
     * No description
     *
     * @tags Follow
     * @name FollowCreate
     * @summary Toggle follow / unfollow a user
     * @request POST:/follow/{userId}
     * @secure
     */
    followCreate: (userId: string, params: RequestParams = {}) =>
      this.request<CommonResponseViewModel, CommonResponseViewModel>({
        path: `/follow/${userId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Follow
     * @name FollowersList
     * @summary Get followers list
     * @request GET:/follow/{userId}/followers
     */
    followersList: (
      userId: string,
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedUsersResponse, CommonResponseViewModel>({
        path: `/follow/${userId}/followers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Follow
     * @name FollowingList
     * @summary Get following list
     * @request GET:/follow/{userId}/following
     */
    followingList: (
      userId: string,
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedUsersResponse, CommonResponseViewModel>({
        path: `/follow/${userId}/following`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  likes = {
    /**
     * No description
     *
     * @tags Likes
     * @name LikesCreate
     * @summary Toggle like/unlike a post
     * @request POST:/likes/{postId}
     * @secure
     */
    likesCreate: (postId: string, params: RequestParams = {}) =>
      this.request<CommonResponseViewModel, CommonResponseViewModel>({
        path: `/likes/${postId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Likes
     * @name LikesDetail
     * @summary Get likes count for a post
     * @request GET:/likes/{postId}
     */
    likesDetail: (postId: string, params: RequestParams = {}) =>
      this.request<LikesCountResponse, CommonResponseViewModel>({
        path: `/likes/${postId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  notifications = {
    /**
     * No description
     *
     * @tags Notifications
     * @name NotificationsList
     * @summary Get user notifications (paginated) with sender info
     * @request GET:/notifications
     * @secure
     */
    notificationsList: (
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationResponse, CommonResponseViewModel>({
        path: `/notifications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notifications
     * @name ReadUpdate
     * @summary Mark notification as read
     * @request PUT:/notifications/{id}/read
     * @secure
     */
    readUpdate: (id: string, params: RequestParams = {}) =>
      this.request<CommonResponseViewModel, CommonResponseViewModel>({
        path: `/notifications/${id}/read`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  posts = {
    /**
     * No description
     *
     * @tags Posts
     * @name PostsList
     * @summary Get all posts (paginated)
     * @request GET:/posts
     */
    postsList: (
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedPostResponse, CommonResponseViewModel>({
        path: `/posts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PostsCreate
     * @summary Create a new post
     * @request POST:/posts
     * @secure
     */
    postsCreate: (data: CreatePostRequest, params: RequestParams = {}) =>
      this.request<CreatePostResponse, CommonResponseViewModel>({
        path: `/posts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name UserDetail
     * @summary Get all posts by a user
     * @request GET:/posts/user/{userId}
     */
    userDetail: (userId: string, params: RequestParams = {}) =>
      this.request<PostArrayResponse, CommonResponseViewModel>({
        path: `/posts/user/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PostsDelete
     * @summary Delete a post
     * @request DELETE:/posts/{id}
     * @secure
     */
    postsDelete: (id: string, params: RequestParams = {}) =>
      this.request<CommonResponseViewModel, void>({
        path: `/posts/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags Profile
     * @name ProfileDetail
     * @summary Get user profile
     * @request GET:/profile/{userId}
     */
    profileDetail: (userId: string, params: RequestParams = {}) =>
      this.request<UserProfileResponse, CommonResponseViewModel | void>({
        path: `/profile/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name ProfilePartialUpdate
     * @summary Update my profile
     * @request PATCH:/profile/{userId}
     * @secure
     */
    profilePartialUpdate: (
      userId: string,
      data: UpdateProfileRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CommonResponseViewModel & {
          data?: UserModel;
        },
        void
      >({
        path: `/profile/${userId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Profile
     * @name PostsList
     * @summary Get user's profile posts (paginated)
     * @request GET:/profile/{userId}/posts
     */
    postsList: (
      userId: string,
      query?: {
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProfilePostsResponse, void>({
        path: `/profile/${userId}/posts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name SearchList
     * @summary Search for users by username
     * @request GET:/users/search
     * @secure
     */
    searchList: (
      query: {
        /** @example "john" */
        q: string;
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchUsersResponse, CommonResponseViewModel>({
        path: `/users/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
