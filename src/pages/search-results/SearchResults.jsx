// style
import "./SearchResults.scss";

import { getZero } from "../../utils/utils";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router-dom";

export default function SearchResults() {
  const query = useParams().query;
  const { state } = useContext(Context);
  const data =
    [
      ...state.arr.filter((item) => item.title.toLowerCase().includes(query)),
      ...state.arr.filter((item) =>
        item.description.toLowerCase().includes(query)
      ),
      ...state.arr.filter((item) => item.tags.find((i) => i === query)),
    ] || [];

  function filterUniqueObjects(arr, key) {
    var seen = new Set();
    return arr.filter((obj) => {
      var value = obj[key];
      if (!seen.has(value)) {
        seen.add(value);
        return true;
      }
      return false;
    });
    setData(filteredArr);
  }

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
                <span className="tags__item-inner">{item.title}</span>
                <Link to={`/${item.type}/${item.id}`} />
                <span className="tags__item-time">{item.createdAt}</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
