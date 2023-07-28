// style
import "./Posts.scss";

// components
import { MiniSideBar, Toast } from "../../components";
import { useEffect, useState, FC } from "react";
import { Link, useParams } from "react-router-dom";
import { firebaseLink, imageKitLink } from "../../constants";
import { copyLink } from "../../utils/copyLink";
import YouTube from "react-youtube";
import { Helmet } from "react-helmet";
import { v4 } from "uuid";
import usePostsStore from "../../store/posts.store";
import usePosts from "../../hooks/usePosts";
import getTime from "../../utils/getTime";
import { IPost } from "../../interfaces/posts.interface";

type IParams = {
  type: "reviews" | "trailers" | "news";
  id: string;
};

const Post: FC = (): JSX.Element => {
  const { post } = usePostsStore();
  const { getPost } = usePosts();
  const { type, id } = useParams() as IParams;

  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const handleCloseSuccessToast = (): void => setIsShowToast(false);
  const handleOpenSuccessToast = (): void => setIsShowToast(true);
  const [data, setData] = useState<IPost>({} as IPost);
  const isTrailer: boolean = type === "trailers";
  const image: string = isTrailer ? `https://i.ytimg.com/vi/${data?.videoId}/hq720.jpg` : data?.image;
  const stateText: string = type === "reviews" ? "maqola" : type === "trailers" ? "treyler" : "yangilik";

  getPost(type, id);
  useEffect(() => setData(post), [post]);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="post">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Rivyu | ${data?.title}`}</title>
      </Helmet>
      <div className="post__wrapper container">
        <div className="post__article article-post">
          <div className="article-post__inner">
            {!!image && <span className="post-badge">{stateText}</span>}
            {!isTrailer ? (
              <>{!!image && <img className="article-post__image" src={image?.replace(firebaseLink, imageKitLink)} alt={data?.title} />}</>
            ) : (
              <YouTube videoId={data.videoId} className="article-post__iframe" />
            )}

            <div className="article-post__content">
              <div className="article-post__time-like-wrapper">
                <time className="article-post__time" dateTime={getTime(data?.createdAt)}>
                  {!!image ? getTime(data.createdAt) : "yuklanmoqda..."}
                </time>
                <div className="article-post__buttons-wrapper">
                  <button onClick={() => copyLink(handleOpenSuccessToast, handleCloseSuccessToast)} className="article-post__button">
                    <img src="/images/icon-link.svg" />
                  </button>
                </div>
              </div>
              {image && (
                <>
                  <h2 className="secondary-title">{data.title}</h2>
                  {data.description && (
                    <div className="article-post__descs">
                      {data.description.split("\n").map(desc => (
                        <p key={v4()} className="article-post__desc">
                          {desc}
                        </p>
                      ))}
                    </div>
                  )}
                  {!!data?.tags?.length && (
                    <div className="article-post__tags">
                      {data.tags &&
                        data.tags.map(tag => (
                          <Link className="article-post__tag" to={`/search/${tag.toLowerCase()}`} key={tag}>
                            {tag}
                          </Link>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="post__side-bar">
          <MiniSideBar title={`So'nggi ${stateText}lar`} />
        </div>
      </div>
      <Toast handleClose={handleCloseSuccessToast} isOpen={isShowToast}>
        Havola nusxalandi!
      </Toast>
    </section>
  );
};

export default Post;
