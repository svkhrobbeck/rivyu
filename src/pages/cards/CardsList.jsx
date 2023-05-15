// style
import "./Cards.scss";

// components
import { Modal, Loader } from "../../components";

import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";

export default function CardsList({
  setData,
  isAuth,
  isAdmin,
  data,
  state = false,
}) {
  const text = state ? "Maqolalar" : "Yangiliklar";
  const stateText = state ? "reviews" : "news";
  document.title = `Kino Blog | ${text}`;

  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => setIsOpen(false);
  const handleModalOpen = () => setIsOpen(true);
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = async (id, state) => {
    setIsLoading(true);
    const itemObj = data.find((item) => item.id === id);
    const desertRef = ref(storage, itemObj.image);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
        const postDoc = doc(db, stateText, id);
        deleteDoc(postDoc);
        setData(data);
        handleModalClose();
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="cards">
      <div className="container">
        {isLoading && <Loader />}
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
                onClick={() => deletePost(id, state)}
              >
                Ha
              </button>
            </div>
          </div>
        </Modal>
        <div className="cards__inner">
          <h2 className="cards__title">{text}</h2>
          <ul className="cards-list">
            {data &&
              data.map((item) => (
                <li key={item.id} className="card-item">
                  <img
                    className="card-item__image"
                    src={item.image}
                    alt={item.title}
                    width="246"
                  />
                  <div className="card-item__content">
                    <h3 className="card-item__title">
                      <Link to={`/${stateText}/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="card-item__desc">{item.shortDesc}</p>
                    <div className="card-item__times">
                      <time
                        className="card-item__time"
                        dateTime={item.createdAt}
                      >
                        {item.createdAt}
                      </time>
                      {item.lastEdited && (
                        <time
                          className="card-item__time card-item__time--edited"
                          dateTime={item.lastEdited}
                        >
                          {item.lastEdited}
                        </time>
                      )}
                    </div>
                  </div>
                  {isAdmin && (
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
                      <Link
                        to={`/admin/edit-post/${
                          item.isNews ? "news" : "reviews"
                        }/${item.id}`}
                      >
                        <button className="card-item__button">
                          <img src="/images/icon-edit.svg" alt="" />
                        </button>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
