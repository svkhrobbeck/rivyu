// style
import "./Tags.scss";

import { getZero } from "../../utils/utils";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router-dom";

export default function Tags({ data }) {
  const tag = useParams().tag;
  const { state } = useContext(Context);

  const filteredData = state.arr.filter((item) =>
    item.tags.find((i) => i === tag)
  );

  return (
    <section className="tags">
      <div className="container">
        <h2 className="tags__title">
          Qidiruv natijalari: <span className="tags__title-inner">{tag}</span>
        </h2>
        <ul className="tags__list">
          {filteredData &&
            filteredData.map((item, i) => (
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
