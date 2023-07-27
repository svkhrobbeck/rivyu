// style
import "./FavoritePost.scss";

import { Link } from "react-router-dom";
import { firebaseLink, imageKitLink } from "../../constants";
import usePostsStore from "../../store/posts.store";
import useUiStore from "../../store/ui.store";

const FavoritePost = ({ click }) => {
  const { posts } = usePostsStore();
  const { dispatch } = useUiStore();
  let { image, title, id, type } = posts[0] || {};

  const handleModalOpen = () => {
    click(id);
    dispatch({ type: "modal", payload: true });
  };

  return (
    <>
      {!!image && (
        <section className="favorite-post">
          <div className="favorite-post__img-wrapper">
            <img className="favorite-post__img" src={image?.replace(firebaseLink, imageKitLink)} alt={title} width="640" title={title} />
            <span className="post-badge">Eng so'nggi post</span>
          </div>
          <div className="favorite-post__content">
            <h3 className="secondary-title">{title}</h3>
            <div className="favorite-post__buttons">
              <button className="favorite-post__button" onClick={handleModalOpen}>
                <img src="/images/icon-trash.svg" />
              </button>
              <Link className="favorite-post__button" to={`/edit/${type}/${id}`}>
                <img src="/images/icon-edit.svg" />
              </Link>
            </div>
            <Link className="favorite-post__btn button button--green" to={`/${type}/${id}`}>
              Batafsil
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default FavoritePost;
