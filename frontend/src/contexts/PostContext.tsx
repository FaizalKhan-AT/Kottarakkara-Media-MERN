import React, { createContext, FC, useState } from "react";
import { News } from "../interfaces/NewsInterface";
export interface PostType {
  post: News | null;
  setPost: React.Dispatch<React.SetStateAction<News | null>>;
}
export const Post = createContext<PostType | null>(null);
interface Props {
  children: React.ReactNode;
}
const PostContext: FC<Props> = ({ children }) => {
  const [post, setPost] = useState<News | null>(null);
  return <Post.Provider value={{ post, setPost }}>{children}</Post.Provider>;
};

export default PostContext;
