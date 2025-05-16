import type { Post as ApiPost } from "../services/Api";

export interface Post extends Omit<ApiPost, "createdAt"> {
  createdAt: Date;
   id: number; 
}