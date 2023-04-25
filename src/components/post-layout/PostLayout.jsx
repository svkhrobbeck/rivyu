import "./PostLayout.scss";
import { Link, useParams } from "react-router-dom";

export default function PostLayout({ arr, state = false }) {
  const id = +useParams().id;
  const data = arr.find((item) => item.id === id);
  const filteredData = arr.filter((item) => item.id !== id);
  document.title = data.title

  return (
    <section className="post-layout" data-post-layout>
      <div className="post-layout__inner container">
        <div className="post">
          <div className="post__inner">
            <span className="post__badge">{state ? "Tahlil" : "Xabar"}</span>
            <img
              className="post__image"
              src={`/${data.image}`}
              alt={data.title}
            />
            <time className="post__time" dateTime={data.createdAt}>
              {data.createdAt}
            </time>
            <h2 className="post__title" data-post-layout-title>
              {data.title}
            </h2>
            <p className="post__description" data-post-layout-desc>
              {data.post.description}
            </p>
            <ul className="post__tags" data-post-layout-tags>
              {data &&
                data.post.tags.map((item) => (
                  <li key={item} className="post__tag">
                    <a className="post__tag-link" href="">
                      {item}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mini-sidebar">
          <h3 className="mini-sidebar__title">
            So'nggi {state ? "tahlillar" : "yangiliklar"}
          </h3>
          <ul className="mini-sidebar__list" data-post-layout-list>
            {filteredData &&
              filteredData.map((item) => (
                <li key={item.id} className="mini-sidebar__item">
                  <Link to={`/${state ? "reviews": "news"}/post/${item.id}`}>{item.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
