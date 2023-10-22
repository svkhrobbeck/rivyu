// styles
import "./Post.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
// components/hooks
import { FC, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
// interface
import { IPost } from "@interfaces/posts.interface";
import { baseApiUrl, imageNotShown } from "@helpers/constants";
// service
import PostsService from "@service/PostsService";

const FavoritePost: FC = (): JSX.Element => {
  const [latestPost, setLatestPost] = useState<IPost>({} as IPost);
  const navigate = useNavigate();
  const img = !!latestPost.videoId ? latestPost.image : baseApiUrl + latestPost.image;

  const getLatestPost = async () => {
    const { post } = await PostsService.getLatestPost();
    setLatestPost(post);
  };

  useEffect(() => {
    getLatestPost();
  }, []);

  return (
    <section className="latest-post" onClick={() => navigate(`${latestPost.category}/${latestPost.slug}`)}>
      <div className="latest-post__img-wrapper">
        <LazyLoadImage
          className="latest-post__img"
          src={latestPost.image ? img : imageNotShown}
          alt={latestPost.title}
          effect="blur"
          width="100%"
          height="auto"
        />
        <span className="post-badge">Eng so'nggi post</span>
      </div>
      <div className="latest-post__content">
        <h3 className="secondary-title">{latestPost.title}</h3>
        <button className="latest-post__btn button button--mini button--green">Batafsil</button>
      </div>
    </section>
  );
};

export default FavoritePost;
