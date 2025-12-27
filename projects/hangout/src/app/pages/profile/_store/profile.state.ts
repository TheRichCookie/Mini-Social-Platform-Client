import type {
  PostModel,
  UserModel,
} from '../../../../../../utils/ui-kit/definitions/swagger/swagger';

export interface HangProfileState {
  user: UserModel;
  posts: PostModel[];
  followers: number;
  following: number;
  receivedTime: number;
}
