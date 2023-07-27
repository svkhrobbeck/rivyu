import usePosts from "../hooks/usePosts";
import usePostsStore from "../store/posts.store";

// components
import Router from "../router/Router";
import { Header, Footer, SideBar } from "../components";

const Layout = () => {
  // const usersRef = doc(db, "users", "users");
  // onSnapshot(usersRef, getData);
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
