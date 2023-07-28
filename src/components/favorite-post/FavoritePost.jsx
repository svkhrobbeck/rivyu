// style
import "./FavoritePost.scss";

import { Link } from "react-router-dom";
import { firebaseLink, imageKitLink } from "../../constants";
import usePostsStore from "../../store/posts.store";

const FavoritePost = () => {
  const { posts } = usePostsStore();
  let { image, title, id, type, videoId } = posts[0] || {};
  const isTrailer = type === "trailers";
  const postImage = isTrailer ? `https://i.ytimg.com/vi/${videoId}/hq720.jpg` : image;

  return (
    <>
      {!!postImage && (
        <section className="favorite-post">
          <div className="favorite-post__img-wrapper">
            {isTrailer ? (
              <img className="favorite-post__img" src={postImage} alt={title} width="640" title={title} />
            ) : (
              <img className="favorite-post__img" src={image?.replace(firebaseLink, imageKitLink)} alt={title} width="640" title={title} />
            )}
            <span className="post-badge">Eng so'nggi post</span>
          </div>
          <div className="favorite-post__content">
            <h3 className="secondary-title">{title}</h3>
            <Link className="favorite-post__btn button button--mini button--green" to={`/${type}/${id}`}>
              Batafsil
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default FavoritePost;
