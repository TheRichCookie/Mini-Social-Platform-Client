import { User } from "./auth.dto";

export interface Like {
  _id: string;
  userId: string; // user _id
  postId: string; // post _id
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface LikesCount {
  likes: number;
}