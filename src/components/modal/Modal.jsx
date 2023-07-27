// style
import "./Modal.scss";

import { createPortal } from "react-dom";

const Modal = ({ children }) => {

  const handleModalClose = () => dispatch({ type: "MODAL_CLOSE" });

  return createPortal(
    <section className={`modal ${state.modalOpen && "modal--show"}`}>
      <div className="modal__dialog">
        <button className="modal__close" onClick={handleModalClose}>
          <img src="/images/icon-close.svg" alt="icon close" />
        </button>
        <div className="modal__content">{children}</div>
      </div>
      <div className="modal__overlay" onClick={handleModalClose}></div>
    </section>,
    document.body
  );
};

export default Modal;
