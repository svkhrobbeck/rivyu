// style
import "./SearchResults.scss";

import { useEffect } from "react";
import getZero from "../../utils/getZero";
import { Link, useParams } from "react-router-dom";
import filterUniqueObjects from "../../utils/filterUniqueObjects";
import { Helmet } from "react-helmet";
import usePostsStore from "../../store/posts.store";

const SearchResults = () => {
  const { query } = useParams();
  const { posts } = usePostsStore();

  const data =
    [
      ...posts.filter(i => i.title.toLowerCase().includes(query)),
      ...posts.filter(i => i.description.toLowerCase().includes(query)),
      ...posts.filter(i => i.tags.find(c => c === query)),
    ] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="tags">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Qidiruv Natijalari | {query}</title>
      </Helmet>
      <div className="container">
        <h2 className="tags__title">
          Qidiruv natijalari: <span className="tags__title-inner">{query}</span>
        </h2>
        <ul className="tags__list">
          {!!data.length ? (
            filterUniqueObjects(data, "id").map(({ id, type, title, createdAt }, i) => (
              <li className="tags__item" key={id}>
                <span className="tags__item-badge">{getZero(++i)}</span>
                <span className="tags__item-inner">
                  <Link className="tags__link" to={`/${type}/${id}`}>
                    {title}
                  </Link>
                </span>
                <span className="tags__item-time">{createdAt}</span>
              </li>
            ))
          ) : (
            <li className="tags__item">
              <span className="tags__item-inner">Natijalar topilmadi</span>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default SearchResults;
