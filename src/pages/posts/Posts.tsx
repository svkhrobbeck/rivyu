// style
import "./Posts.scss";

import { useEffect, useState, FC } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import usePostsStore from "../../store/posts.store";
import usePosts from "../../hooks/usePosts";

// components
import { Modal, ModalInner, PostItem } from "../../components";

const Posts: FC = (): JSX.Element => {
  const { posts } = usePostsStore();
  const { deletePost } = usePosts();
  const type: string = useLocation().pathname.substring(1);
  const text: string = type === "news" ? "Yangiliklar" : "Maqolalar";
  const title: string = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";
  const [id, setId] = useState<string>("");

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="posts">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | {text}</title>
      </Helmet>
      <div className="container">
        <Modal>
          <ModalInner title={title} func={() => deletePost(type, id, "image")} />
        </Modal>

        <div className="posts__inner">
          <h2 className="posts__title main-title">{text}</h2>
          <ul className="posts__list list-posts">
            {!posts.length && <li className="post-item">{text} topilmadi!</li>}
            {posts.map(post => (
              <PostItem key={post.id} {...post} setId={setId} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Posts;
