// styles
import "./Create.scss";
import "react-toastify/dist/ReactToastify.css";
// toast
import { ToastContainer, toast } from "react-toastify";
// constant
import { iframeEmbedLink, imageNotShown, tabs, videoIdRegex } from "@helpers/constants";
// interface
interface INewPost {
  [key: string]: string | Blob | null;
}
// service
import PostsService from "@service/PostsService";
// hook
import { useState, FC, ChangeEvent, FormEvent } from "react";
import { Helmet } from "react-helmet";
// component/hook
import { Link, useNavigate } from "react-router-dom";
// error type
import { AxiosError } from "axios";

const Create: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<Blob | null>(null);
  const [desc, setDesc] = useState<string>("");
  const [trailer, setTrailer] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const isTrailer = category === "trailers";
  const videoIdMatch = videoIdRegex.test(trailer) && trailer.match(videoIdRegex);
  const videoId = videoIdMatch ? videoIdMatch[0] : "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload: INewPost = { title, desc, slug, category, videoId, image };
      const formData: FormData = new FormData();
      for (const key in payload) formData.append(key, payload[key] as Blob);
      await PostsService.createPost(formData);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError;
      const error = axiosError.response?.data as Error;
      toast(error.message, { type: "error", theme: "dark" });
    }
  };

  return (
    <section className="admin-create">
      <Helmet>
        <title>Rivyu | Yangi post</title>
      </Helmet>
      <ToastContainer />
      <div className="admin-create__container container">
        <form className="admin-create__form admin-form" onSubmit={handleSubmit}>
          {/* categories */}
          <div className="admin-form__field-wrapper">
            <select className="admin-form__select" defaultValue={""} onChange={e => setCategory(e.target.value)}>
              <option value="" hidden>
                Kategoriyani tanlang
              </option>
              {tabs.map(tab => (
                <option className="admin-form__option" value={tab.category} key={tab.text}>
                  {tab.text}
                </option>
              ))}
            </select>
          </div>

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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files && e.target.files[0])}
              />
              <label className="admin-form__label admin-form__label--image admin-form__label--image-05 admin-form__field" htmlFor="image">
                <span className="admin-form__label-inner">{image ? image.name : "Rasm"}</span>
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
              onChange={e => setSlug(e.target.value.split(" ").join("-"))}
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
            <iframe className="admin__iframe" src={iframeEmbedLink + videoId} width={400} />
          ) : (
            <img
              className="admin__image"
              src={image ? URL.createObjectURL(image) : imageNotShown}
              alt={image ? image.name : "rasm"}
              width={400}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Create;
