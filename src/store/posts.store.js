import { create } from "zustand";

export const types = { reviews: "reviews", trailers: "trailers", news: "news" };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.reviews:
      return { posts: payload };

    case types.news:
      return { posts: payload };

    case types.trailers:
      return { posts: payload };

    default:
      return state;
  }
};

const usePostsStore = create(set => ({
  type: "reviews",
  isLoading: false,
  error: "",
  posts: [],
  currentPost: {},
  setType: type => set(() => ({ type })),
  setIsLoading: isLoading => set(() => ({ isLoading })),
  setError: error => set(() => ({ error })),
  dispatch: args => set(state => reducer(state, args)),
  setCurrentPost: currentPost => set(() => ({ currentPost })),
}));

export default usePostsStore;
