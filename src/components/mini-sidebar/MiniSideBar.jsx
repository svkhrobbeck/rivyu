// style
import "./MiniSideBar.scss";

import getTime from "../../utils/getTime";
import { Link } from "react-router-dom";
import usePostsStore from "../../store/posts.store";

const MiniSideBar = ({ title }) => {
  const { posts } = usePostsStore();

  return (
    <div className="mini-sidebar">
      <h3 className="mini-sidebar__heading">{title}</h3>
      <ul className="mini-sidebar__list">
        {posts.slice(0, 8).map(item => (
          <li key={item.id} className="mini-sidebar__item">
            <Link className="mini-sidebar__link" to={`/${item.type}/${item.id}`}>
              {item.title}
            </Link>
            <time className="main-time" dateTime={getTime(item.createdAt)}>
              {getTime(item.createdAt)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniSideBar;
