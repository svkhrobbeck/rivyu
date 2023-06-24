// style
import "./FavoritePost.scss";

import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { firebaseLink, imageKitLink } from "../../constants";

const FavoritePost = () => {
  const { state } = useContext(Context);
  let { image, title, id, type } = state?.arr[0] || {};

  return (
    <>
      {!!image && (
        <section className="favorite-post">
          <img className="favorite-post__img" src={image?.replace(firebaseLink, imageKitLink)} alt={title} width="640" title={title} />
          <h4 className="favorite-post__title">Eng so'ngi xabar</h4>
          <h5 className="favorite-post__subtitle" title={title}>
            {title}
          </h5>
          <Link className="favorite-post__btn button button--green" to={`/${type}/${id}`}>
            Batafsil
          </Link>
        </section>
      )}
    </>
  );
};

export default FavoritePost;
