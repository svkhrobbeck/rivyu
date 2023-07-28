// style
import "./FavoritePost.scss";

import { Link } from "react-router-dom";
import { firebaseLink, imageKitLink } from "../../constants";
import usePostsStore from "../../store/posts.store";
import useUiStore from "../../store/ui.store";

const FavoritePost = ({ click }) => {
  const { posts } = usePostsStore();
  const { dispatch } = useUiStore();
  let { image, title, id, type, videoId } = posts[0] || {};
  const isTrailer = type === "trailers";
  const postImage = isTrailer ? `https://i.ytimg.com/vi/${videoId}/hq720.jpg` : image;
  const handleModalOpen = () => {
    click(id);
    dispatch({ type: "modal", payload: true });
  };

  return (
    <section className="favorite-post">
      {!!postImage && (
        <div className="favorite-post__img-wrapper">
          {isTrailer ? (
            <img className="favorite-post__img" src={postImage} alt={title} width="640" title={title} />
          ) : (
            <img className="favorite-post__img" src={image?.replace(firebaseLink, imageKitLink)} alt={title} width="640" title={title} />
          )}
          <span className="post-badge">Eng so'nggi post</span>
        </div>
      )}
      <div className="favorite-post__content">
        <h3 className="secondary-title">{title}</h3>
        <div className="favorite-post__buttons crud-buttons">
          <button className="crud-button" onClick={handleModalOpen}>
            <img src="/images/icon-trash.svg" />
          </button>
          <Link className="crud-button" to={`/edit/${type}/${id}`}>
            <img src="/images/icon-edit.svg" />
          </Link>
        </div>
        <Link className="favorite-post__btn button button--mini button--green" to={`/${type}/${id}`}>
          Batafsil
        </Link>
      </div>
    </section>
  );
};

export default FavoritePost;
