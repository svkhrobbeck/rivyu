// style
import "./Card.scss";

import { Link } from "react-router-dom";
import { firebaseLink, imageKitLink, imageNotShown } from "../../constants";
import useUiStore from "../../store/ui.store";
import getTime from "../../utils/getTime";

const Card = ({ image, title, createdAt, id, videoId, click, type }) => {
  const { dispatch } = useUiStore();
  const time = getTime(createdAt);

  const handleModalOpen = () => {
    click();
    dispatch({ type: "modal", payload: true });
  };

  return (
    <div className="card">
      {type === "trailers" ? (
        <img className="card__img" src={`https://i.ytimg.com/vi/${videoId}/hq720.jpg`} alt={title} width={300} />
      ) : (
        <img className="card__img" src={image ? image?.replace(firebaseLink, imageKitLink) : imageNotShown} alt={title} width={300} />
      )}
      <div className="card__content">
        <h3 className="card__heading">
          <Link className="card__link" to={`/${type}/${id}`}>
            {title}
          </Link>
        </h3>
        <div className="main-times card__times">
          <time className="card__time main-time" dateTime={time}>
            {time}
          </time>
        </div>
        <div className="crud-buttons card__buttons">
          <button className="crud-button" onClick={handleModalOpen}>
            <img src="/images/icon-trash.svg" />
          </button>
          <Link className="crud-button" to={`/edit/${type}/${id}`}>
            <img src="/images/icon-edit.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
