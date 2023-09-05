// styles
import "./Post.scss";
// components
import { MiniSideBar, Toast } from "@components/index";
import YouTube from "react-youtube";
import { Helmet } from "react-helmet";
// hooks/utils
import { useEffect, useState, FC } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// interfaces
import { IPost } from "@interfaces/posts.interface";
// helpers
import getTime from "@helpers/getTime";
import { copyLink } from "@helpers/copyLink";
import PostsService from "@service/PostsService";
import { baseApiUrl } from "@helpers/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

// prop type
type IParams = {
  type: "reviews" | "trailers" | "news";
  slug: string;
};

const Post: FC = (): JSX.Element => {
  const { slug } = useParams() as IParams;

  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const handleCloseSuccessToast = (): void => setIsShowToast(false);
  const handleOpenSuccessToast = (): void => setIsShowToast(true);
  const [post, setPost] = useState<IPost>({} as IPost);

  const isTrailer: boolean = post.category === "trailers";
  const image = isTrailer ? `https://i.ytimg.com/vi/${post?.videoId}/hq720.jpg` : baseApiUrl + post?.image;
  const stateText: string =
    post.category === "reviews" ? "maqola" : post.category === "trailers" ? "treyler" : "yangilik";

  const getPost = async (slug: string) => {
    const data = await PostsService.getPost(slug);
    setPost(data.post);
  };

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    getPost(slug);
  }, [slug]);
  return (
    <section className="post">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Rivyu | ${post?.title}`}</title>
      </Helmet>

      <div className="post__wrapper container">
        <div className="post__article article-post">
          <div className="article-post__inner">
            {!!image && <span className="post-badge">{stateText}</span>}
            {!isTrailer ? (
              <LazyLoadImage className="article-post__image" alt={post.title} effect="blur" src={image} />
            ) : (
              <YouTube videoId={post.videoId} className="article-post__iframe" />
            )}

            <div className="article-post__content">
              <div className="article-post__time-like-wrapper">
                <time className="article-post__time" dateTime={getTime(post?.createdAt)}>
                  {!!image ? getTime(post.createdAt) : "yuklanmoqda..."}
                </time>
                <div className="article-post__buttons-wrapper">
                  <button
                    onClick={() => copyLink(handleOpenSuccessToast, handleCloseSuccessToast)}
                    className="article-post__button"
                  >
                    <img src="/images/icon-link.svg" />
                  </button>
                </div>
              </div>
              {image && (
                <>
                  <h2 className="secondary-title">{post.title}</h2>
                  {post.desc && (
                    <div className="article-post__descs">
                      {post.desc.split("\n").map(desc => (
                        <p key={uuidv4()} className="article-post__desc">
                          {desc}
                        </p>
                      ))}
                    </div>
                  )}
                  {!!post?.tags?.length && (
                    <div className="article-post__tags">
                      {post.tags &&
                        post.tags.map(tag => (
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
