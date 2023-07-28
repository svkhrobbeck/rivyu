import { create } from "zustand";
import { IPost } from "../interfaces/posts.interface";

interface State {
  isLoading: boolean;
  error: string | null;
  posts: IPost[];
  post: IPost;
  type: "reviews" | "trailers" | "news";
}

interface Actions {
  setIsLoading: (isLoading: State["isLoading"]) => void;
  setError: (error: State["error"]) => void;
  setPosts: (posts: State["posts"]) => void;
  setPost: (post: State["post"]) => void;
  setType: (type: State["type"]) => void;
}

const usePostsStore = create<State & Actions>(set => ({
  isLoading: false,
  error: null,
  posts: [] as IPost[],
  post: {} as IPost,
  type: "reviews",
  setIsLoading: isLoading => set(() => ({ isLoading })),
  setError: error => set(() => ({ error })),
  setPosts: posts => set(() => ({ posts })),
  setPost: post => set(() => ({ post })),
  setType: type => set(() => ({ type })),
}));

export default usePostsStore;
