// style
import "./CardsList.scss";

// components
import { Modal } from "../../components";

import { useContext, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { Link, useLocation } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { Context } from "../../context/Context";

export default function CardsList() {
  const pathName = useLocation().pathname.slice(1);
  const text = pathName === "news" ? "Yangiliklar" : "Maqolalar";
  const { state, dispatch } = useContext(Context);

  const getData = () => {
    if (pathName === "news") {
      return state.data.news;
    } else if (pathName === "reviews") {
      return state.data.reviews;
    } else if (pathName === "trailers") {
      return state.data.trailers;
    }
  };

  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => setIsOpen(false);
  const handleModalOpen = () => setIsOpen(true);

  const deletePost = async (id) => {
    const postDoc = doc(db, pathName, id);
    const item = getData().find((item) => item.id === id);
    if (item.image) {
      const desertRef = ref(storage, item.image);
      deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully");
          deleteDoc(postDoc);
        })
        .catch((error) => {
          console.log("Uh-oh, an error occurred!");
        })
        .finally(() => {
          dispatch({ type: "IS_UPDATED" });
        });
    } else {
      deleteDoc(postDoc);
      dispatch({ type: "IS_UPDATED" });
    }
    handleModalClose();
  };

  return (
    <section className="cards">
      <div className="container">
        <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
          <div className="modal-inner">
            <h3 className="modal-inner__title">
              Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?
            </h3>
            <div className="modal-inner__buttons">
              <button
                className="button button--green"
                onClick={handleModalClose}
              >
                Yo'q
              </button>
              <button
                className="button button--blue"
                onClick={() => deletePost(id)}
              >
                Ha
              </button>
            </div>
          </div>
        </Modal>
        <div className="cards__inner">
          <h2 className="cards__title main-title">{text}</h2>
          <ul className="cards-list">
            {!state.arr.length && (
              <li className="card-item">{text} topilmadi!</li>
            )}
            {getData() &&
              getData().map((item) => (
                <li key={item.id} className="card-item">
                  <img
                    className="card-item__image"
                    src={item.image}
                    alt={item.title}
                    width="246"
                  />
                  <div className="card-item__content">
                    <h3 className="card-item__title">
                      <Link to={`/${pathName}/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="card-item__desc">{item.shortDesc}</p>
                    <div className="card-item__times">
                      <time
                        className="card-item__time main-time"
                        dateTime={item.createdAt}
                      >
                        {item.createdAt}
                      </time>
                      {item.lastEdited && (
                        <time
                          className="card-item__time main-time card-item__time--edited"
                          dateTime={item.lastEdited}
                        >
                          {item.lastEdited}
                        </time>
                      )}
                    </div>
                    {state.isAdmin && (
                      <div className="card-item__buttons">
                        <button
                          className="card-item__button"
                          onClick={() => {
                            setId(item.id);
                            handleModalOpen();
                          }}
                        >
                          <img src="/images/icon-trash.svg" alt="" />
                        </button>
                        <Link to={`/admin/edit-post/${pathName}/${item.id}`}>
                          <button className="card-item__button">
                            <img src="/images/icon-edit.svg" alt="" />
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
}
