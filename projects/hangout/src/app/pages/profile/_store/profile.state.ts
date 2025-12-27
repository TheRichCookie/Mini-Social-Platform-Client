import type {
  PostModel,
  UserModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangProfileState {
  user: UserModel | undefined;
  posts: PostModel[];
  followers: number | undefined;
  following: number | undefined;
  receivedTime: number | undefined;
  error: {
    receivedTime: number | undefined;
    message: string | undefined;
  };
}
