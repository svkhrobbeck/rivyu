// styles
import "./Home.scss";
import "react-toastify/dist/ReactToastify.css";
// components
import { MiniSidebar, LatestPost, Card, Modal, ModalInner, Tabs, Pagination } from "@components/index";
import { Helmet } from "react-helmet";
// store
import useUiStore from "@store/ui.store";
// hooks
import { FC, useEffect } from "react";
import { useState } from "react";
import PostsService from "@service/PostsService";
import { limit } from "@helpers/constants";
import { IParams, IPost } from "@interfaces/posts.interface";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home: FC = (): JSX.Element => {
  const { setModal } = useUiStore();
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
  const [total, setTotal] = useState<number>();
  const [slug, setSlug] = useState<string>();
  const title: string = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "reviews";
  const page = +(searchParams.get("page") || 1);

  const params = { page, limit, category };

  const getPosts = async (params: IParams) => {
    try {
      const { total, posts } = await PostsService.getPosts(params);
      setPosts(posts);
      setTotal(total);
    } catch (err) {
      const error = err as Error;
      toast(error.message);
    } finally {
    }
  };

  useEffect(() => {
    getPosts(params);
  }, [category, limit, page]);

  const deletePost = async () => {
    await PostsService.deletePost(slug as string);
    await getPosts(params);
    setModal(false);
  };

  const click = (slug: string) => setSlug(slug);

  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <section className="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Kino Yangiliklari</title>
      </Helmet>

      <ToastContainer />

      <Modal>
        <ModalInner title={title} func={deletePost} />
      </Modal>

      <div className="container">
        <div className="home__inner">
          <div className="home__content">
            <LatestPost />
          </div>
          <div className="home__side-bar">
            <MiniSidebar title="So'nggi yangiliklar" />
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
        <Pagination total={total as number} />
      </div>
    </section>
  );
};

export default Home;
