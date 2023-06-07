// style
import { Link } from "react-router-dom";
import "./Trailers.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Modal } from "../../components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Trailers() {
  const { state, dispatch } = useContext(Context);
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => setIsOpen(false);

  const handleModalOpen = () => setIsOpen(true);

  const handleTrailerDelete = id => {
    const postDoc = doc(db, "trailers", id);
    deleteDoc(postDoc);
    handleModalClose();
  };

  return (
    <section className="trailers">
      <h2 className="trailers__title main-title">Treylerlar</h2>
      <ul className="trailers__list">
        <Modal isOpen={isOpen} handleModalClose={handleModalClose}>
          <div className="modal-inner">
            <h3 className="modal-inner__title">Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?</h3>
            <div className="modal-inner__buttons">
              <button className="button button--green" onClick={handleModalClose}>
                Yo'q
              </button>
              <button className="button button--blue" onClick={() => handleTrailerDelete(id)}>
                Ha
              </button>
            </div>
          </div>
        </Modal>
        {!state.arr.length && <li style={{ textAlign: "center" }}>Treylerlar topilmadi</li>}
        {state.data.trailers &&
          state.data.trailers.map(item => (
            <li key={item.id} className="trailers__item item-trailers">
              <img
                className="item-trailers__img"
                src={item.image ? item.image : "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi"}
                alt="Ma'lumot havfsizligini ta'minlash (1-dars)"
                width={300}
              />
              <h3 className="item-trailers__heading">
                <Link className="item-trailers__link" to={`/trailers/${item.id}`}>
                  {item.title}
                </Link>
              </h3>
              <div className="item-trailers__times">
                <time className="item-trailers__time main-time" dateTime={item.createdAt}>
                  {item.createdAt}
                </time>
              </div>
              {state.isAdmin && (
                <div className="item-trailers__buttons">
                  <button
                    className="item-trailers__button"
                    onClick={() => {
                      setId(item.id);
                      handleModalOpen();
                    }}
                  >
                    <img src="/images/icon-trash.svg" alt="" />
                  </button>
                  <Link className="item-trailers__button" to={`/admin/edit-post/trailers/${item.id}`}>
                    <img src="/images/icon-edit.svg" alt="" />
                  </Link>
                </div>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
