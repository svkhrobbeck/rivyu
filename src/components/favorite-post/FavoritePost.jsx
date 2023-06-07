// style
import { useContext } from "react";
import "./FavoritePost.scss";

import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const FavoritePost = () => {
  const { state } = useContext(Context);
  let data = [];

  if (state.data?.news) {
    data = state.arr[0] || null;
  }

  return (
    <>
      {!!data?.image && (
        <section className="favorite-post">
          <img className="favorite-post__img" src={data.image} alt={data.title} width="640" title={data.title} />
          <h4 className="favorite-post__title">Eng so'ngi xabar</h4>

          <h5 className="favorite-post__subtitle" title={data.title}>
            {data.title}
          </h5>

          <Link className="button button--green" to={`/${data.type}/${data.id}`}>
            Batafsil
          </Link>
        </section>
      )}
    </>
  );
};

export default FavoritePost;
