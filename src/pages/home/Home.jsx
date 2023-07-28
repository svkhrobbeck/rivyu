// style
import "./Home.scss";

// components
import { MiniSideBar, FavoritePost, Card, Modal, ModalInner, Tabs } from "../../components";

import { useEffect } from "react";
import { Helmet } from "react-helmet";
import usePostsStore from "../../store/posts.store";
import usePosts from "../../hooks/usePosts";
import { useState } from "react";
import useUiStore from "../../store/ui.store";

const Home = () => {
  const { posts, type } = usePostsStore();
  const { dispatch } = useUiStore();
  const { deletePost } = usePosts();
  const title = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";
  const [id, setId] = useState("");

  const func = () => {
    deletePost(type, id, "image");
    dispatch({ type: "modal", payload: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Kino Yangiliklari</title>
      </Helmet>
      <Modal>
        <ModalInner title={title} func={func} />
      </Modal>

      <div className="container">
        <div className="home__inner">
          <div className="home__content">
            <FavoritePost />
          </div>
          <div className="home__side-bar">
            <MiniSideBar title="So'nggi yangiliklar" state="news" />
          </div>
        </div>
        <Tabs />
        <div className="posts-home">
          {!!posts.length ? posts.map(item => <Card key={item.id} click={() => setId(item.id)} {...item} />) : <>Maqolalar topilmadi</>}
        </div>
      </div>
    </section>
  );
};

export default Home;
