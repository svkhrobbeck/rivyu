// style
import "./Home.scss";

// components
import { MiniSideBar, FavoritePost, Card, Modal, ModalInner, Tabs } from "../../components";

import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import usePostsStore from "../../store/posts.store";
import usePosts from "../../hooks/usePosts";
import { useState } from "react";
import useUiStore from "../../store/ui.store";

const Home: FC = (): JSX.Element => {
  const { posts, type } = usePostsStore();
  const { setModal } = useUiStore();
  const { deletePost } = usePosts();
  const title: string = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";
  const [id, setId] = useState<string>("");

  const func = (): void => {
    deletePost(type, id, "image");
    setModal(false);
  };

  const click = (id: string) => setId(id);

  useEffect(() => window.scrollTo(0, 0), []);

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
            <MiniSideBar title="So'nggi yangiliklar" />
          </div>
        </div>
        <Tabs />
        <div className="posts-home">
          {!!posts.length ? posts.map(item => <Card key={item.id} click={click} {...item} />) : <>Maqolalar topilmadi</>}
        </div>
      </div>
    </section>
  );
};

export default Home;
