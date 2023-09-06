// styles
import "./Search.scss";
// components
import { Helmet } from "react-helmet";
// helpers
import getZero from "@helpers/getZero";
import getTime from "@helpers/getTime";
import filterUniqueObjects from "@helpers/filterUniqueObjects";
// hooks
import { useEffect, FC } from "react";
import { Link, useParams } from "react-router-dom";

const SearchResults: FC = (): JSX.Element => {
  const { query } = useParams() as { query: string };

  const data =
    [
      ...posts.filter(i => i.title.toLowerCase().includes(query)),
      ...posts.filter(i => i.desc.toLowerCase().includes(query)),
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
            filterUniqueObjects(data, "_id").map(({ _id, category, slug, title, createdAt }, i) => (
              <li className="tags__item" key={_id}>
                <span className="tags__item-badge">{getZero(++i)}</span>
                <Link className="tags__link" to={`/${category}/${slug}`}>
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
