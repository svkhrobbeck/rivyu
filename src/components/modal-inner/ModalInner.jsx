// style
import "./ModalInner.scss";

import useUiStore from "../../store/ui.store";

const ModalInner = ({ func, title = "" }) => {
  const { dispatch } = useUiStore();

  const handleModalClose = () => dispatch({ type: "modal", payload: false });

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
