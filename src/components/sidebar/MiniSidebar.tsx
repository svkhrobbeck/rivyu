// styles
import "./Sidebar.scss";
// fc
import { FC, useState, useEffect } from "react";
// helpers
import getTime from "@helpers/getTime";
// link
import { Link, useSearchParams } from "react-router-dom";
// service
import PostsService from "@service/PostsService";
// constant
import { limit } from "@helpers/constants";
import { IPost } from "@interfaces/posts.interface";

interface IMiniSidebarProps {
  title: string;
}

const MiniSideBar: FC<IMiniSidebarProps> = ({ title }): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<IPost[]>([] as IPost[]);

  const page = +(searchParams.get("page") || 1);
  const category = searchParams.get("category") || "reviews";

  const getPosts = async () => {
    const data = await PostsService.getPosts({ limit, page, category });
    setPosts(data.posts);
  };

  useEffect(() => {
    getPosts();
  }, [page, category]);

  return (
    <div className="mini-sidebar">
      <h3 className="mini-sidebar__heading">{title}</h3>
      {!!posts.length && (
        <ul className="mini-sidebar__list">
          {posts.slice(0, 6).map(item => (
            <li key={item._id} className="mini-sidebar__item">
              <Link className="mini-sidebar__link" to={`/${item.category}/${item.slug}`}>
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
