// style
import "./ModalInner.scss";

import { useContext } from "react";
import { Context } from "../../context/Context";

const ModalInner = ({ func, title = "" }) => {
  const { dispatch } = useContext(Context);
  const handleModalClose = () => dispatch({ type: "MODAL_CLOSE" });

  return (
    <div className="modal-inner">
      <h3 className="modal-inner__title">{title}</h3>
      <div className="modal-inner__buttons">
        <button className="button button--green" onClick={handleModalClose}>
          Yo'q
        </button>
        <button className="button button--blue" onClick={func}>
          Ha
        </button>
      </div>
    </div>
  );
};

export default ModalInner;
