// styles
import "./Home.scss";
// components
import { MiniSideBar, LatestPost, Card, Modal, ModalInner, Tabs, Pagination } from "@components/index";
import { Helmet } from "react-helmet";
// store
import useUiStore from "@store/ui.store";
import usePostsStore from "@store/posts.store";
// hooks
import { FC, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home: FC = (): JSX.Element => {
  const { posts } = usePostsStore();
  const { setModal } = useUiStore();
  const title: string = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";
  const [id, setId] = useState<string>("");

  const func = (): void => {
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
            <LatestPost />
          </div>
          <div className="home__side-bar">
            <MiniSideBar title="So'nggi yangiliklar" />
          </div>
        </div>
        <Tabs />
        <div className="posts-home">
          {!!posts.length ? (
            posts.map(item => <Card key={item._id} click={click} {...item} />)
          ) : (
            <>Maqolalar topilmadi</>
          )}
        </div>
        <Pagination />
      </div>
    </section>
  );
};

export default Home;
