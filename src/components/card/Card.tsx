// style
import "./Card.scss";

import { FC } from "react";
import { Link } from "react-router-dom";
import { firebaseLink, imageKitLink, imageNotShown } from "../../helpers/constants";
import useUiStore from "../../store/ui.store";
import getTime from "../../helpers/getTime";
import { IPost } from "../../interfaces/posts.interface";

interface ICard extends IPost {
  click: (id: string) => void;
}

const Card: FC<ICard> = ({ image, title, createdAt, id, videoId, click, type }): JSX.Element => {
  const { setModal } = useUiStore();
  const time: string = getTime(createdAt);

  const handleModalOpen = (): void => {
    click(id);
    setModal(true);
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
