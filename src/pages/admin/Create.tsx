// styles
import "./Admin.scss";
// components
import { TagBadge } from "@components/index";
import { Helmet } from "react-helmet";
// hooks/utils
import { useState, FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tabs } from "@helpers/constants";
import PostsService from "@service/PostsService";
interface ITags {
  value: string;
  id: string;
}

interface INewPost {
  [key: string]: string | null | Blob;
}

const Create: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [image, setImage] = useState<Blob | null>(null);
  const [title, setTitle] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [linkTrailer, setLinkTrailer] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const videoId = linkTrailer.slice(-11);
  const [category, setCategory] = useState("reviews");

  const handleCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: INewPost = { title, desc, slug: "slug-random-3", category, shortDesc, image };
    const formData: FormData = new FormData();
    for (const key in payload) formData.append(key, payload[key] as Blob);
    await PostsService.createPost(formData);
    navigate("/");
  };

  return (
    <div className="create-edit container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Maqola yaratish</title>
      </Helmet>

      <h2 className="create-edit__title">Yangi Post Yaratish</h2>
      <form className="create-edit__form" onSubmit={handleCreatePost}>
        <div className="create-edit__fields">
          {tabs.map(tab => (
            <label className="create-edit__label" key={tab.category}>
              <input
                className="create-edit__checkbox visually-hidden"
                type="radio"
                checked={category === tab.category}
                onChange={() => setCategory(tab.category)}
              />
              <span className="create-edit__fake-radio" />
              <span className="create-edit__label-inner">{tab.text}</span>
            </label>
          ))}
        </div>
        {/* {!!myTags.length && (
        <ul className="create-edit__tags">
        {myTags.map(item => (
          <li key={item.id} className="create-edit__tag">
              <TagBadge id={item.id} handleDeleteTags={handleDeleteTags}>
              {item.value}
              </TagBadge>
            </li>
            ))}
        </ul>
      )} */}
        <div className="create-edit__fields">
          <label htmlFor="titleCreate">Sarlavha</label>
          <input
            className="main-field create-edit__field create-edit__field--title"
            type="text"
            name="title"
            placeholder="sarlavha"
            value={title}
            id="titleCreate"
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="main-field create-edit__field create-edit__field--short-desc"
            type="text"
            name="short_description"
            placeholder="qisqa izoh"
            value={shortDesc}
            onChange={e => setShortDesc(e.target.value)}
          />
        </div>
        {category === "trailers" && (
          <div className="create-edit__fields">
            <input
              className="main-field create-edit__field create-edit__field--short-desc"
              type="text"
              name="link_trailer"
              placeholder="Treylerga havola: https://youtu.be/identifikator"
              value={linkTrailer}
              onChange={e => setLinkTrailer(e.target.value)}
            />
          </div>
        )}
        <div className="create-edit__fields">
          <div className="create-edit__field-wrapper">
            <input
              className="main-field create-edit__field create-edit__field--tag"
              type="text"
              name="tags"
              placeholder="teglar"
              onChange={e => setTags(e.target.value)}
              value={tags}
            />
            <button className="admin-form__tag-button" type="button">
              Teg qo'shish
            </button>
          </div>
          {category !== "trailers" && (
            <div className="create-edit__fields">
              <input
                className="create-edit__field create-edit__field--image visually-hidden"
                type="file"
                name="image"
                accept="image/*"
                id="image-input-create"
                placeholder="post rasmi"
                onChange={e => setImage(e.target.files && e.target.files[0])}
              />
              <label
                className="main-field create-edit__field create-edit__field--image-label"
                htmlFor="image-input-create"
              >
                {image ? "rasm tanlandi" : "rasmni tanlang"}
              </label>
            </div>
          )}
        </div>
        <div className="create-edit__fields">
          <textarea
            className="main-field create-edit__textarea"
            name="description"
            placeholder="izoh"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />

          {category !== "trailers" && (
            <img
              className="create-edit__img"
              src={image ? URL.createObjectURL(image) : "/images/temp-image.svg"}
              alt={image?.name}
            />
          )}
        </div>
        <div className="create-edit__buttons">
          <Link className="button button--green" to={"/admin"}>
            Bekor Qilish
          </Link>
          <button className="create-edit__button button button--blue" type="submit">
            {/* <span>{isLoading && <img src="/images/rolling-spinner.svg" />}</span>
          {isLoading ? "Yaratish" : "Yaratilmoqda..."} */}
            Yaratish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
