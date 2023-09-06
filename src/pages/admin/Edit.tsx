// styles
import "./Create.scss";
import "react-toastify/dist/ReactToastify.css";
// constant
import { baseApiUrl, iframeEmbedLink, imageNotShown, videoIdRegex, youtubeVideoBaseUrl } from "@helpers/constants";
// interface
import { IPost } from "@interfaces/posts.interface";
interface INewPost {
  [key: string]: string | Blob | null;
}
// service
import PostsService from "@service/PostsService";
// hook
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import { Helmet } from "react-helmet";
// component/hook
import { Link, useNavigate, useParams } from "react-router-dom";
// toast
import { toast, ToastContainer } from "react-toastify";
// error type
import { AxiosError } from "axios";

const Edit: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [media, setMedia] = useState<Blob | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [oldTrailer, setOldTrailer] = useState<string>("");
  const [trailer, setTrailer] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const isTrailer = category === "trailers";
  const videoIdMatch = trailer ? trailer.match(videoIdRegex) : oldTrailer.match(videoIdRegex);
  const videoId = videoIdMatch ? videoIdMatch[0] : null;
  const { slug: postSlug } = useParams();

  const getPost = async (slug: string) => {
    const { post }: { post: IPost } = await PostsService.getPost(slug);
    setTitle(post.title);
    setDesc(post.desc);
    setSlug(post.slug);
    setCategory(post.category);
    setOldTrailer(youtubeVideoBaseUrl + post.videoId);
    setImage(baseApiUrl + post.image);
  };

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    getPost(postSlug as string);
  }, [postSlug]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: INewPost = { title, desc, slug, category, ...(isTrailer ? { videoId } : {}), image: media };
    const formData: FormData = new FormData();
    for (const key in payload) formData.append(key, payload[key] as Blob);
    await PostsService.updatePost(postSlug as string, formData);
    navigate("/");
  };

  return (
    <section className="admin-create">
      <Helmet>
        <title>Rivyu | Yangi post</title>
      </Helmet>
      <div className="admin-create__container container">
        <form className="admin-create__form admin-form" onSubmit={handleSubmit}>
          {/* title */}
          <div className="admin-form__field-wrapper">
            <label className="admin-form__label" htmlFor="title">
              Sarlavha
            </label>
            <input
              className="admin-form__field"
              type="text"
              placeholder="Sarlavha"
              id="title"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* image */}
          {category !== "trailers" && (
            <div className="admin-form__field-wrapper">
              <label className="admin-form__label" htmlFor="image">
                Rasm
              </label>
              <input
                className="admin-form__field admin-form__field--image visually-hidden"
                type="file"
                accept="image/*"
                placeholder="Sarlavha"
                id="image"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMedia(e.target.files && e.target.files[0])}
              />
              <label className="admin-form__label admin-form__label--image admin-form__field" htmlFor="image">
                <span className="admin-form__label-inner">{media ? media.name : image}</span>
              </label>
            </div>
          )}

          {/* trailer link */}
          {isTrailer && (
            <div className="admin-form__field-wrapper">
              <label className="admin-form__label" htmlFor="slug">
                Youtube Video havolasi
              </label>
              <input
                className="admin-form__field"
                type="text"
                placeholder="havola (video identifikator)"
                id="link"
                onChange={e => setTrailer(e.target.value)}
                value={trailer}
                autoComplete="off"
              />
            </div>
          )}

          {/* slug */}
          <div className="admin-form__field-wrapper">
            <label className="admin-form__label" htmlFor="slug">
              Slug (post havolasi)
            </label>
            <input
              className="admin-form__field"
              type="text"
              placeholder="Slug"
              id="slug"
              onChange={e => setSlug(e.target.value.replace(" ", "-"))}
              value={slug}
            />
          </div>

          {/* description */}
          <div className="admin-form__field-wrapper">
            <label className="admin-form__label" htmlFor="descr">
              Izoh
            </label>
            <textarea
              className="admin-form__field admin-form__field--textarea"
              placeholder="Izoh"
              id="descr"
              onChange={e => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          <div className="admin-form__buttons">
            <Link className="button button--green" to="/">
              Bosh sahifa
            </Link>
            <button className="button button--component" type="submit">
              Yaratish
            </button>
          </div>
        </form>

        {/* image iframe wrapper */}
        <div className="admin__image-iframe-wrapper">
          {isTrailer ? (
            <iframe src={iframeEmbedLink + videoId} className="admin__iframe" />
          ) : (
            <>
              {!!media ? (
                <img
                  className="admin__image"
                  src={URL.createObjectURL(media) || imageNotShown}
                  alt={media.name}
                  width={400}
                />
              ) : (
                <img className="admin__image" src={image as string} alt={title} width={400} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Edit;
