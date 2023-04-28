import "./Tags.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Tags({ news, reviews }) {
  const tag = useParams().tag;
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = [...news, ...reviews];
    const filteredData = data
      .filter((item) => item.tags.find((i) => i === tag))
      .sort((a, b) => b.time - a.time);
    setData(filteredData);
  }, [news]);

  const getZero = (num) => (num >= 10 ? num : `0${num}`);

  return (
    <section className="tags">
      <div className="container">
        <h2 className="tags__title">
          Qidiruv natijalari: <span className="tags__title-inner">{tag}</span>
        </h2>
        <ul className="tags__list">
          {data &&
            data.map((item, i) => (
              <li className="tags__item" key={item.id}>
                <span className="tags__item-badge">{getZero(++i)}</span>
                <span className="tags__item-inner">{item.title}</span>
                <span className="tags__item-time">{item.createdAt}</span>
                <Link to={`/${item.isNews ? "news" : "reviews"}/${item.id}`} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
