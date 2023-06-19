// style
import "./Trailers.scss";

import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Card, Modal } from "../../components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Trailers() {
  const { state, dispatch } = useContext(Context);
  const [id, setId] = useState("");

  const handleModalClose = () => dispatch({ type: "MODAL_CLOSE" });

  const handleTrailerDelete = () => {
    const postDoc = doc(db, "trailers", id);
    deleteDoc(postDoc);
    handleModalClose();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="trailers">
      <h2 className="trailers__title main-title">Treylerlar</h2>
      <ul className="trailers__list">
        {!state.arr.length && <li style={{ textAlign: "center" }}>Treylerlar topilmadi</li>}
        {state.data.trailers &&
          state.data.trailers.map(item => (
            <li className="trailers__item" key={item.id}>
              <Card {...item} setId={setId} />
            </li>
          ))}
      </ul>

      <Modal>
        <div className="modal-inner">
          <h3 className="modal-inner__title">Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?</h3>
          <div className="modal-inner__buttons">
            <button className="button button--green" onClick={handleModalClose}>
              Yo'q
            </button>
            <button className="button button--blue" onClick={handleTrailerDelete}>
              Ha
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
