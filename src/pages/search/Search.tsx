// style
import "./Search.scss";

import { useEffect, FC } from "react";
import getZero from "../../helpers/getZero";
import { Link, useParams } from "react-router-dom";
import filterUniqueObjects from "../../helpers/filterUniqueObjects";
import { Helmet } from "react-helmet";
import usePostsStore from "../../store/posts.store";
import getTime from "../../helpers/getTime";

const SearchResults: FC = (): JSX.Element => {
  const { query } = useParams() as { query: string };
  const { posts } = usePostsStore();

  const data =
    [
      ...posts.filter(i => i.title.toLowerCase().includes(query)),
      ...posts.filter(i => i.description.toLowerCase().includes(query)),
      ...posts.filter(i => i.tags.find(c => c === query)),
    ] || [];

  useEffect(() => window.scrollTo(0, 0), []);

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
                <Link className="tags__link" to={`/${type}/${id}`}>
                  {title}
                </Link>
                <time className="main-time" dateTime={getTime(createdAt)}>
                  {getTime(createdAt)}
                </time>
              </li>
            ))
          ) : (
            <li className="tags__item">Natijalar topilmadi</li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default SearchResults;
