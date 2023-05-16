import { Link } from "react-router-dom";
import "./MiniSideBar.scss";

export default function MiniSideBar({ arr = [], title = "" }) {
  return (
    <div className="mini-sidebar">
      <h3 className="mini-sidebar__title">
        {title}
        {!arr.length && <img src="/images/rolling-spinner.svg" />}
      </h3>
      <ul className="mini-sidebar__list">
        {arr &&
          arr.map((item) => (
            <li
              onClick={() => (document.documentElement.scrollTop = 0)}
              key={item.id}
              className="mini-sidebar__item"
            >
              <Link to={`/${item.type}/${item.id}`}>{item.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
