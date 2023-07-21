// style
import "./Posts.scss";

// components
import { Modal, ModalInner, PostItem } from "../../components";

import { useContext, useEffect, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { Context } from "../../context/Context";
import { Helmet } from "react-helmet";

const Posts = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const type = useLocation().pathname.substring(1);
  const text = type === "news" ? "Yangiliklar" : "Maqolalar";
  const title = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";

  const [id, setId] = useState("");

  const deletePost = async id => {
    const postDoc = doc(db, type, id);
    const { image } = (await getDoc(postDoc)).data();

    if (image) {
      const desertRef = ref(storage, image);
      deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully");
          deleteDoc(postDoc);
        })
        .catch(err => console.log(err));
    } else {
      deleteDoc(postDoc);
    }
    navigate("/");
    dispatch({ type: "MODAL_CLOSE" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="posts">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | {text}</title>
      </Helmet>
      <div className="container">
        <Modal>
          <ModalInner title={title} func={() => deletePost(id)} />
        </Modal>

        <div className="posts__inner">
          <h2 className="posts__title main-title">{text}</h2>
          <ul className="posts__list list-posts">
            {!state.arr.length && <li className="post-item">{text} topilmadi!</li>}
            {state?.data[type] && state?.data[type]?.map(post => <PostItem key={post.id} {...post} setId={setId} />)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Posts;
