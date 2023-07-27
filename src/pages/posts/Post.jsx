// style
import "./Posts.scss";

// components
import { MiniSideBar, Toast } from "../../components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firebaseLink, imageKitLink } from "../../constants";
import { copyLink } from "../../utils/copyLink";
import YouTube from "react-youtube";
import { Helmet } from "react-helmet";
import { v4 } from "uuid";
import usePostsStore from "../../store/posts.store";
import usePosts from "../../hooks/usePosts";

const Post = () => {
  const { currentPost, posts } = usePostsStore();
  const { getPost } = usePosts();
  const { type, id } = useParams();

  const [isShowToast, setIsShowToast] = useState(false);
  const handleCloseSuccessToast = () => setIsShowToast(false);
  const handleOpenSuccessToast = () => setIsShowToast(true);
  const [data, setData] = useState({});
  const isTrailer = type === "trailers";
  const stateText = type === "reviews" ? "maqola" : type === "trailers" ? "treyler" : "yangilik";

  getPost(type, id);
  useEffect(() => setData(currentPost), [currentPost]);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="post">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.title}</title>
      </Helmet>
      <div className="post__wrapper container">
        <div className="post__article article-post">
          <div className="article-post__inner">
            {!!data.image && <span className="article-post__badge">{stateText}</span>}
            {!isTrailer ? (
              <>
                {!!data.image && (
                  <img className="article-post__image" src={data.image?.replace(firebaseLink, imageKitLink)} alt={data.title} />
                )}
              </>
            ) : (
              <YouTube videoId={data.videoId} className="article-post__iframe" />
            )}

            <div className="article-post__time-like-wrapper">
              <time className="article-post__time" dateTime={data.createdAt}>
                {!!data.image ? data.createdAt : "yuklanmoqda..."}
              </time>
              <div className="article-post__buttons-wrapper">
                <button onClick={() => copyLink(handleOpenSuccessToast, handleCloseSuccessToast)} className="article-post__button">
                  <img src="/images/icon-link.svg" />
                </button>
              </div>
            </div>
            {data.image && (
              <>
                <h2 className="article-post__title">{data.title}</h2>
                <div className="article-post__descs">
                  {data.description.split("\n").map(desc => (
                    <p key={v4()} className="article-post__desc">
                      {desc}
                    </p>
                  ))}
                </div>
                {data.tags.length ? (
                  <ul className="article-post__tags">
                    {data.tags &&
                      data.tags.map(tag => (
                        <li key={tag} className="article-post__tag">
                          <Link to={`/search/${tag.toLowerCase()}`}>{tag}</Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className="post__side-bar">
          <MiniSideBar arr={posts.filter(item => item.type === type && item.id !== id).slice(0, 6)} title={`So'nggi ${stateText}lar`} />
        </div>
      </div>
      <Toast handleClose={handleCloseSuccessToast} isOpen={isShowToast}>
        Havola nusxalandi!
      </Toast>
    </section>
  );
};

export default Post;
