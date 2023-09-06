import { FC, useEffect } from "react";

// components
import Router from "@router/Router";
import { Footer, Header, SideBar } from "@components/index";
// store
import usePostsStore from "@store/posts.store";
// service
import PostsService from "@service/PostsService";
// interface
import { IParams } from "@interfaces/posts.interface";
import { useSearchParams } from "react-router-dom";
// constant
import { limit } from "@helpers/constants";

const Layout: FC = (): JSX.Element => {
  const { setPosts, setIsLoading, setError, setTotal } = usePostsStore();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "reviews";
  const page = +(searchParams.get("page") || 1);

  const params = { page, limit, category };

  const getPosts = async (params: IParams) => {
    setIsLoading(true);
    try {
      const { total, posts } = await PostsService.getPosts(params);
      setPosts(posts);
      setTotal(total);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts(params);
  }, [category, limit, page]);

  return (
    <>
      <Header />
      <main className="main-content">
        <SideBar />
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
