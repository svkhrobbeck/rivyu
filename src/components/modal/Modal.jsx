import { createPortal } from "react-dom";
import "./Modal.scss";
export default function Modal({ isOpen, handleModalClose, children }) {
  return createPortal(
    <section className={`modal ${isOpen && "modal--show"}`}>
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
}
