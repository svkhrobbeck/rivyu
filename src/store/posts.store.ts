import { create } from "zustand";
import { IPost } from "@interfaces/posts.interface";

interface State {
  isLoading: boolean;
  error: string | null;
  posts: IPost[];
  category: "reviews" | "trailers" | "news";
}

interface Actions {
  setIsLoading: (isLoading: State["isLoading"]) => void;
  setError: (error: State["error"]) => void;
  setPosts: (posts: State["posts"]) => void;
  setCategory: (category: State["category"]) => void;
}

const usePostsStore = create<State & Actions>(set => ({
  isLoading: false,
  error: null,
  posts: [] as IPost[],
  category: "reviews",
  setIsLoading: isLoading => set(() => ({ isLoading })),
  setError: error => set(() => ({ error })),
  setPosts: posts => set(() => ({ posts })),
  setCategory: category => set(() => ({ category })),
}));

export default usePostsStore;
