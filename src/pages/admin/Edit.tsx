// styles
import "./Admin.scss";
// components
import { TagBadge } from "@components/index";
import { Helmet } from "react-helmet";
// store
// hooks/utils
import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IPost } from "@interfaces/posts.interface";
import PostsService from "@service/PostsService";
import { baseApiUrl } from "@helpers/constants";

interface ITags {
  value: string;
  id: string;
}

type IParams = {
  slug: string;
};

const Edit: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { slug } = useParams() as IParams;

  const [media, setMedia] = useState<Blob | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [myTags, setMyTags] = useState<ITags[]>([] as ITags[]);
  const [tags, setTags] = useState<string>("");

  const handleAddTags = (): void => {
    if (!tags.trim() || tags.length <= 3) return;
    const value = tags.split(" ").join("").trim();
    const newTags = [...myTags, { value, id: uuidv4() }];
    setMyTags(newTags);
    setTags("");
  };

  const handleDelTags = (id: string) => {
    const tags = myTags.filter(item => item.id !== id);
    setMyTags(tags);
  };

  const getPost = async (slug: string) => {
    const { post }: { post: IPost } = await PostsService.getPost(slug);
    setTitle(post.title);
    setDesc(post.desc);
    setShortDesc(post.shortDesc);
    setCategory(post.category);
    setImage(baseApiUrl + post.image);
  };

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    getPost(slug);
  }, [slug]);

  return (
    <div className="create-edit container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Rivyu | ${title}`}</title>
      </Helmet>
      <h2 className="create-edit__title">Postni Yangilash</h2>
      {!!myTags?.length && (
        <ul className="create-edit__tags">
          {myTags.map(item => (
            <li key={item.id} className="create-edit__tag">
              <TagBadge id={item.id} handleDeleteTags={handleDelTags}>
                {item.value}
              </TagBadge>
            </li>
          ))}
        </ul>
      )}
      <input
        className="main-field create-edit__field create-edit__field--title"
        type="text"
        name="title"
        placeholder="sarlavha"
        value={title}
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

      <div className="create-edit__field-wrapper">
        <input
          className="main-field create-edit__field create-edit__field--tag"
          type="text"
          name="tags"
          placeholder="teglar"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <button onClick={handleAddTags} className="admin-form__tag-button" type="button">
          Teg qo'shish
        </button>
      </div>
      {category !== "trailers" && (
        <>
          <input
            className="create-edit__field create-edit__field--image visually-hidden"
            type="file"
            name="image"
            accept="image/*"
            placeholder="post rasmi"
            id="image-input-edit"
            onChange={e => setMedia(e.target.files && e.target.files[0])}
          />
          <label
            className="main-field create-edit__field create-edit__field--image-label create-edit__field--image-label-block"
            htmlFor="image-input-edit"
          >
            {media ? "rasm tanlandi" : "rasmni tanlang"}
          </label>
        </>
      )}
      <div className="create-edit__fields">
        <textarea
          className="main-field create-edit__textarea"
          name="description"
          placeholder="izoh"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        {!media && <img className="create-edit__img" src={image ? image : "/images/temp-image.svg"} alt="post image" />}
        {media && (
          <img
            className="create-edit__img"
            src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"}
            alt="post image"
          />
        )}
      </div>
      <div className="create-edit__buttons">
        <Link className="button button--blue" to="/">
          Bekor Qilish
        </Link>
        <button className="button button--green" type="button">
          Yangilash
        </button>
      </div>
    </div>
  );
};

export default Edit;
