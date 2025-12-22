import { User } from "./auth.dto";

export interface CommentModel {
  _id: string;
  userId: string;
  postId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AddCommentRequest {
  text: string;
}

export interface DeleteCommentRequest {
  commentId: string;
}