import { User } from "./auth.dto";

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}