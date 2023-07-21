// style
import "./MiniSideBar.scss";

import { Link } from "react-router-dom";

const MiniSideBar = ({ title, arr }) => {
  if (!!!arr.length) return;

  return (
    <div className="mini-sidebar">
      <h3 className="mini-sidebar__title">
        {title}
        {!arr.length && <img src="/images/rolling-spinner.svg" />}
      </h3>
      <ul className="mini-sidebar__list">
        {arr &&
          arr.map(item => (
            <li onClick={() => (document.documentElement.scrollTop = 0)} key={item.id} className="mini-sidebar__item">
              <Link className="mini-sidebar__link" to={`/${item.type}/${item.id}`}>
                {item.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MiniSideBar;
