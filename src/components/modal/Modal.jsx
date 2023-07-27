// style
import "./Modal.scss";

import { createPortal } from "react-dom";
import useUiStore from "../../store/ui.store";

const Modal = ({ children }) => {
  const { modal, dispatch } = useUiStore();

  const handleModalClose = () => dispatch({ type: "modal", payload: false });

  return createPortal(
    <section className={`modal ${modal && "modal--show"}`}>
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
