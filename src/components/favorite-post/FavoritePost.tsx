// styles
import "./FavoritePost.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
// components/hooks
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
// helpers
import { firebaseLink, imageKitLink } from "@helpers/constants";
// store
import usePostsStore from "@store/posts.store";
// interface
import { IPost } from "@interfaces/posts.interface";

const FavoritePost: FC = (): JSX.Element => {
  const { posts } = usePostsStore();
  const navigate = useNavigate();
  let { image, title, id, type, videoId } = (posts[0] || {}) as IPost;
  const img: string =
    type === "trailers" ? `https://i.ytimg.com/vi/${videoId}/hq720.jpg` : image?.replace(firebaseLink, imageKitLink);

  return (
    <>
      {!!img && (
        <section className="favorite-post">
          <div className="favorite-post__img-wrapper" onClick={() => navigate(`${type}/${id}`)}>
            <LazyLoadImage className="card__image" alt={title} effect="blur" src={img} />
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
