// styles
import "./MiniSideBar.scss";
// fc
import { FC } from "react";
// helpers
import getTime from "@helpers/getTime";
// link
import { Link } from "react-router-dom";
// store
import usePostsStore from "@store/posts.store";

const MiniSideBar: FC<{ title: string }> = ({ title }): JSX.Element => {
  const { posts } = usePostsStore();

  return (
    <div className="mini-sidebar">
      <h3 className="mini-sidebar__heading">{title}</h3>
      {posts.slice(0, 8) && (
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
      )}
    </div>
  );
};

export default MiniSideBar;
