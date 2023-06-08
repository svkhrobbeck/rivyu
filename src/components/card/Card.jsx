// style
import "./Card.scss";

import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

const Card = ({ image, title, createdAt, id, setId, type }) => {
  const imageNotShown = "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi";
  const { state, dispatch } = useContext(Context);

  const handleModalOpen = () => dispatch({ type: "MODAL_OPEN" });

  return (
    <div className="card">
      <img className="card__img" src={image ? image : imageNotShown} alt={title} width={300} />
      <div className="card__content">
        <h3 className="card__heading">
          <Link className="card__link" to={`/${type}/${id}`}>
            {title}
          </Link>
        </h3>
        <div className="card__times">
          <time className="card__time main-time" dateTime={createdAt}>
            {createdAt}
          </time>
        </div>
      </div>
      {state.isAdmin && (
        <div className="card__buttons">
          <button
            className="card__button"
            onClick={() => {
              setId(id);
              handleModalOpen();
            }}
          >
            <img src="/images/icon-trash.svg" />
          </button>
          <Link className="card__button" to={`/admin/edit-post/${type}/${id}`}>
            <img src="/images/icon-edit.svg" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card;