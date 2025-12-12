import type {UkImageInfo} from '../common/image-info.interface';
import type {UkUserFullInfo} from './user.interface';
import type {UkUserPrivate} from './user-private.interface';
import type {UkUserPublic} from './user-public.interface';

export interface UkUserInfo<
  U extends UkUserFullInfo | UkUserPrivate = UkUserPublic,
> {
  user?: U;
  // roles?: Role[];
  avatar?: UkImageInfo;
}
