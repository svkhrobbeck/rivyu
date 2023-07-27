// style
import "./ModalInner.scss";


const ModalInner = ({ func, title = "" }) => {

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
