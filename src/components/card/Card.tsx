// styles
import "./Card.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
// components
import { FC } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// helpers
import { baseApiUrl } from "@helpers/constants";
import getTime from "@helpers/getTime";
// stroe
import useUiStore from "@store/ui.store";
// interface
import { IPost } from "@interfaces/posts.interface";
// prop interface
interface ICard extends IPost {
  click: (id: string) => void;
}

const Card: FC<ICard> = ({ image, title, createdAt, _id, videoId, click, category, slug }): JSX.Element => {
  const { setModal } = useUiStore();
  const time: string = getTime(createdAt);

  const img: string = !!videoId ? image : baseApiUrl + image;

  const handleModalOpen = (): void => {
    click(slug);
    setModal(true);
  };

  return (
    <div className="card">
      <div className="card__image-wrapper">
        <LazyLoadImage className="card__image" alt={title} effect="blur" src={img} />
      </div>
      <div className="card__content">
        <h3 className="card__heading">
          <Link className="card__link" to={`/${category}/${slug}`}>
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
          <Link className="crud-button" to={`/edit/${slug}`}>
            <img src="/images/icon-edit.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
