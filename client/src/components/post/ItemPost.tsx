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
import { baseApiUrl } from "@helpers/constants";

// prop interface
interface IPostItem extends IPost {
  setId: (id: string) => void;
}

const PostItem: FC<IPostItem> = ({
  slug,
  _id,
  lastEdited,
  videoId,
  image,
  title,
  createdAt,
  category,
  setId,
}): JSX.Element => {
  const { setModal } = useUiStore();
  const createdTime = getTime(createdAt);
  const updatedTime = getTime(lastEdited);

  const img: string = !!videoId ? image : baseApiUrl + image;

  return (
    <li className="item-post">
      <img className="item-post__image" src={img} alt={title} width="246" />
      <div className="item-post__content">
        <h3 className="item-post__title">
          <Link className="item-post__link" to={`/${category}/${slug}`}>
            {title}
          </Link>
        </h3>
        <p className="item-post__desc">shortDesc</p>
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
              setId(_id);
              setModal(true);
            }}
          >
            <img src="/images/icon-trash.svg" alt="icon trash" />
          </button>
          <Link className="item-post__button" to={`/edit/${category}/${slug}`}>
            <img src="/images/icon-edit.svg" alt="icon edit" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
