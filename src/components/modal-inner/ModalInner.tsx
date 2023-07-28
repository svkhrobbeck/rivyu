// style
import "./ModalInner.scss";

import { FC } from "react";
import useUiStore from "../../store/ui.store";

interface IModalInner {
  func: () => void;
  title: string;
}

const ModalInner: FC<IModalInner> = ({ func, title = "" }): JSX.Element => {
  const { setModal } = useUiStore();

  const handleModalClose = (): void => setModal(false);

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
