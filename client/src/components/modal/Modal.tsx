// styles
import "./Modal.scss";
// components/utils
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
// store
import useUiStore from "@store/ui.store";

const Modal: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const { modal, setModal } = useUiStore();

  const handleModalClose = () => setModal(false);
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
