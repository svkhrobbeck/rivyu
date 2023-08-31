import { FC } from "react";
import usePosts from "@hooks/usePosts";
import usePostsStore from "@store/posts.store";

// components
import Router from "@router/Router";
import { Footer, Header, SideBar } from "@components/index";

const Layout: FC = (): JSX.Element => {
  const { getPosts } = usePosts();
  const { type } = usePostsStore();

  getPosts(type);

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
