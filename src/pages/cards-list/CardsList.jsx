// style
import "./CardsList.scss";

// components
import { Modal, ModalInner } from "../../components";

import { useContext, useEffect, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { Context } from "../../context/Context";
import { firebaseLink, imageKitLink } from "../../constants";

const CardsList = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const { type } = useParams();
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
    <section className="cards">
      <div className="container">
        <Modal>
          <ModalInner title={title} func={() => deletePost(id)} />
        </Modal>

        <div className="cards__inner">
          <h2 className="cards__title main-title">{text}</h2>
          <ul className="cards-list">
            {!state.arr.length && <li className="card-item">{text} topilmadi!</li>}
            {state?.data[type] &&
              state?.data[type]?.map(({ id, lastEdited, image, title, shortDesc, createdAt }) => (
                <li key={id} className="card-item">
                  <img className="card-item__image" src={image?.replace(firebaseLink, imageKitLink)} alt={title} width="246" />
                  <div className="card-item__content">
                    <h3 className="card-item__title">
                      <Link to={`/${type}/${id}`}>{title}</Link>
                    </h3>
                    <p className="card-item__desc">{shortDesc}</p>
                    <div className="card-item__times">
                      <time className="card-item__time main-time" dateTime={createdAt}>
                        {createdAt}
                      </time>
                      {lastEdited && (
                        <time className="card-item__time main-time card-item__time--edited" dateTime={lastEdited}>
                          {lastEdited}
                        </time>
                      )}
                    </div>
                    {state.isAdmin && (
                      <div className="card-item__buttons">
                        <button
                          className="card-item__button"
                          onClick={() => {
                            setId(id);
                            dispatch({ type: "MODAL_OPEN" });
                          }}
                        >
                          <img src="/images/icon-trash.svg" alt="icon trash" />
                        </button>
                        <Link to={`/admin/edit/${type}/${id}`}>
                          <button className="card-item__button">
                            <img src="/images/icon-edit.svg" alt="icon edit" />
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CardsList;
