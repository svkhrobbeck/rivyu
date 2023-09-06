// styles
import "./Post.scss";
import "react-toastify/dist/ReactToastify.css";
// toast
import { ToastContainer, toast } from "react-toastify";
// components
import { MiniSidebar } from "@components/index";
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
  const [post, setPost] = useState<IPost>({} as IPost);

  const notify = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast("Havola nusxalandi!!", { theme: "dark", type: "success" }));
  };

  const isTrailer = post.category === "trailers";
  const image = isTrailer ? post.image : baseApiUrl + post.image;

  const getCategoryText = (category: string) => {
    switch (category) {
      case "reviews":
        return "maqola";

      case "news":
        return "yangilik";

      case "trailers":
        return "treyler";

      default:
        return "maqola";
    }
  };

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

      <ToastContainer />

      <div className="post__wrapper container">
        <div className="post__article article-post">
          <div className="article-post__inner">
            {!!image && <span className="post-badge">{getCategoryText(post.category)}</span>}
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
                  <button onClick={notify} className="article-post__button">
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
          <MiniSidebar title={`So'nggi ${getCategoryText(post.category)}lar`} />
        </div>
      </div>
    </section>
  );
};

export default Post;
