// style
import "./Admin.scss";

// components
import { TagBadge } from "../../components";

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { Helmet } from "react-helmet";

const Create = () => {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [linkTrailer, setLinkTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [mytags, setMytags] = useState([]);
  const tags = mytags.map(item => item.value);
  const videoId = linkTrailer.slice(-11);
  const [type, setType] = useState("reviews");

  const elTagInput = useRef(null);
  const navigate = useNavigate();

  const newPostData = () => ({ lastEdited: "", title, shortDesc, description, tags, createdAt: Date.now(), type });

  const handleAddTags = () => {
    if (!elTagInput.current.value.trim() || tags.length >= 6) return;
    const val = elTagInput.current.value.split(" ").join("").trim(" ");
    const newTags = [...mytags, { value: val, id: uuidv4() }];
    setMytags(newTags);
    elTagInput.current.value = "";
  };

  const handleDeleteTags = id => {
    const filteredTags = mytags.filter(item => item.id !== id);
    setMytags(filteredTags);
  };

  const postsRef = collection(db, type);

  const createPost = async () => {
    if (type !== "trailers" && media === null) return;
    else if (title === "") return;

    if (type !== "trailers") {
      const mediaRef = ref(storage, `images/${media.name + uuidv4()}`);
      try {
        const uploadTask = uploadBytesResumable(mediaRef, media);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          error => {
            console.log(error);
          },
          () => getDownloadURL(uploadTask.snapshot.ref).then(image => addDoc(postsRef, { image, ...newPostData() }))
        );
      } catch {
        console.log("error");
      }
    } else addDoc(postsRef, { videoId, ...newPostData() });
    navigate("/");
  };

  return (
    <div className="create-edit container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Maqola yaratish</title>
      </Helmet>
      <h2 className="create-edit__title">Yangi Post Yaratish</h2>
      <div className="create-edit__fields">
        <label className="create-edit__label">
          <input
            className="create-edit__checkbox visually-hidden"
            type="radio"
            name="is_news"
            checked={type === "reviews"}
            onChange={() => setType("reviews")}
          />
          <span className="create-edit__fake-radio" />
          <span className="create-edit__label-inner">Maqola</span>
        </label>

        <label className="create-edit__label">
          <input className="create-edit__checkbox visually-hidden" type="radio" name="is_news" onChange={() => setType("news")} />
          <span className="create-edit__fake-radio" />
          <span className="create-edit__label-inner">Yangilik</span>
        </label>

        <label className="create-edit__label">
          <input className="create-edit__checkbox visually-hidden" type="radio" name="is_news" onChange={() => setType("trailers")} />
          <span className="create-edit__fake-radio" />
          <span className="create-edit__label-inner">Treyler</span>
        </label>
      </div>
      {!!tags.length && (
        <ul className="create-edit__tags">
          {mytags &&
            mytags.map(item => (
              <li key={item.id} className="create-edit__tag">
                <TagBadge id={item.id} handleDeleteTags={handleDeleteTags}>
                  {item.value}
                </TagBadge>
              </li>
            ))}
        </ul>
      )}
      <div className="create-edit__fields">
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
      </div>
      {type === "trailers" && (
        <div className="create-edit__fields">
          <input
            className="main-field create-edit__field create-edit__field--short-desc"
            type="text"
            name="link_trailer"
            placeholder="Treylerga havola: https://youtu.be/6ECxfVvKan4"
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
            ref={elTagInput}
          />
          <button onClick={handleAddTags} className="admin-form__tag-button" type="button">
            Teg qo'shish
          </button>
        </div>
        {type !== "trailers" && (
          <div className="create-edit__fields">
            <input
              className="create-edit__field create-edit__field--image visually-hidden"
              type="file"
              name="image"
              accept="image/*"
              id="image-input-create"
              placeholder="post rasmi"
              onChange={e => setMedia(e.target.files[0])}
            />
            <label className="main-field create-edit__field create-edit__field--image-label" htmlFor="image-input-create">
              {media ? "rasm tanlandi" : "rasmni tanlang"}
            </label>
          </div>
        )}
      </div>
      <div className="create-edit__fields">
        <textarea
          className="main-field create-edit__textarea"
          name="description"
          placeholder="izoh"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {type !== "trailers" && (
          <img className="create-edit__img" src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"} alt="" />
        )}
      </div>
      <div className="create-edit__buttons">
        <Link className="button button--green" to={"/admin"}>
          Bekor Qilish
        </Link>
        <button className="create-edit__button button button--blue" type="button" onClick={createPost}>
          {/* <span>{isLoading && <img src="/images/rolling-spinner.svg" />}</span>
          {isLoading ? "Yaratish" : "Yaratilmoqda..."} */}
          Yaratish
        </button>
      </div>
    </div>
  );
};

export default Create;
