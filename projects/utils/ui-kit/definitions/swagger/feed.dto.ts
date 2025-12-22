export interface UserSummaryModel {
  _id: string;
  username: string;
  email?: string;
  avatar?: string;
  major?: string;
}

export interface FeedCommentModel {
  _id: string;
  text: string;
  createdAt: string;
  user: UserSummaryModel;
}

export interface FeedItemModel {
  _id: string;
  content: string;
  createdAt: string;
  author: UserSummaryModel;
  comments: FeedCommentModel[];
  likeCount: number;
  isLikedByUser: boolean;
}