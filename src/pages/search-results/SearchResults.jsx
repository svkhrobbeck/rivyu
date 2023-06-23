// style
import "./SearchResults.scss";

import { useContext, useEffect } from "react";
import getZero from "../../utils/getZero";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router-dom";
import filterUniqueObjects from "../../utils/filterUniqueObjects";

const SearchResults = () => {
  const { query } = useParams();
  const { state } = useContext(Context);
  const data =
    [
      ...state.arr.filter(item => item.title.toLowerCase().includes(query)),
      ...state.arr.filter(item => item.description.toLowerCase().includes(query)),
      ...state.arr.filter(item => item.tags.find(i => i === query)),
    ] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="tags">
      <div className="container">
        <h2 className="tags__title">
          Qidiruv natijalari: <span className="tags__title-inner">{query}</span>
        </h2>
        <ul className="tags__list">
          {data &&
            filterUniqueObjects(data, "id").map((item, i) => (
              <li className="tags__item" key={item.id}>
                <span className="tags__item-badge">{getZero(++i)}</span>
                <span className="tags__item-inner">
                  <Link className="tags__link" to={`/${item.type}/${item.id}`}>
                    {item.title}
                  </Link>
                </span>
                <span className="tags__item-time">{item.createdAt}</span>
              </li>
            ))}
          {!!!data.length && (
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
