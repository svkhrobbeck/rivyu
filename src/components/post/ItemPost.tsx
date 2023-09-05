// styles
import "./Post.scss";
// fc
import { FC } from "react";
// helpers
import getTime from "@helpers/getTime";
// link
import { Link } from "react-router-dom";
// store
import useUiStore from "@store/ui.store";
// interface
import { IPost } from "@interfaces/posts.interface";

// prop interface
interface IPostItem extends IPost {
  setId: (id: string) => void;
}

const PostItem: FC<IPostItem> = ({ id, lastEdited, image, title, shortDesc, createdAt, type, setId }): JSX.Element => {
  const { setModal } = useUiStore();
  const createdTime: string = getTime(createdAt);
  const updatedTime: string = getTime(lastEdited);

  return (
    <li className="item-post">
      <img className="item-post__image" src={image} alt={title} width="246" />
      <div className="item-post__content">
        <h3 className="item-post__title">
          <Link className="item-post__link" to={`/${type}/${id}`}>
            {title}
          </Link>
        </h3>
        <p className="item-post__desc">{shortDesc}</p>
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
        <div className="item-post__buttons">
          <button
            className="item-post__button"
            onClick={() => {
              setId(id);
              setModal(true);
            }}
          >
            <img src="/images/icon-trash.svg" alt="icon trash" />
          </button>
          <Link className="item-post__button" to={`/edit/${type}/${id}`}>
            <img src="/images/icon-edit.svg" alt="icon edit" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
