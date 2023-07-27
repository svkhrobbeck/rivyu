// style
import "./PostItem.scss";

import { firebaseLink, imageKitLink } from "../../constants";
import { Link } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import useUiStore from "../../store/ui.store";

const PostItem = ({ id, lastEdited, image, title, shortDesc, createdAt, type, setId }) => {
  const { dispatch } = useUiStore();
  const { deletePost } = usePosts();

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
        <div className="post-item__times">
          <time className="post-item__time main-time" dateTime={createdAt}>
            {createdAt}
          </time>
          {lastEdited && (
            <time className="post-item__time main-time main-time--edited" dateTime={lastEdited}>
              {lastEdited}
            </time>
          )}
        </div>
        <div className="post-item__buttons">
          <button
            className="post-item__button"
            onClick={() => {
              setId(id);
              dispatch({ type: "modal", payload: true });
            }}
          >
            <img src="/images/icon-trash.svg" alt="icon trash" />
          </button>
          <Link className="post-item__button" to={`/admin/edit/${type}/${id}`}>
            <img src="/images/icon-edit.svg" alt="icon edit" />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
