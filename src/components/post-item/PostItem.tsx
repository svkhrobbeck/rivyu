// style
import "./PostItem.scss";

import { FC } from "react";
import { firebaseLink, imageKitLink } from "../../constants";
import { Link } from "react-router-dom";
import useUiStore from "../../store/ui.store";
import getTime from "../../utils/getTime";
import { IPost } from "../../interfaces/posts.interface";

interface IPostItem extends IPost {
  setId: (id: string) => void;
}

const PostItem: FC<IPostItem> = ({ id, lastEdited, image, title, shortDesc, createdAt, type, setId }): JSX.Element => {
  const { setModal } = useUiStore();
  const createdTime: string = getTime(createdAt);
  const updatedTime: string = getTime(lastEdited);

  return (
    <li className="post-item">
      <img className="post-item__image" src={image?.replace(firebaseLink, imageKitLink)} alt={title} width="246" />
      <div className="post-item__content">
        <h3 className="post-item__title">
          <Link className="post-item__link" to={`/${type}/${id}`}>
            {title}
          </Link>
        </h3>
        <p className="post-item__desc">{shortDesc}</p>
        <div className="main-times">
          <time className="main-time" dateTime={createdTime}>
            {createdTime}
          </time>
          {lastEdited && (
            <time className="main-time main-time--edited" dateTime={updatedTime}>
              {updatedTime}
            </time>
          )}
        </div>
        <div className="post-item__buttons">
          <button
            className="post-item__button"
            onClick={() => {
              setId(id);
              setModal(true);
            }}
          >
            <img src="/images/icon-trash.svg" alt="icon trash" />
          </button>
          <Link className="post-item__button" to={`/edit/${type}/${id}`}>
            <img src="/images/icon-edit.svg" alt="icon edit" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
