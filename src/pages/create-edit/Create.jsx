// style
import "./CreateEdit.scss";

// components
import { TagBadge, Loader } from "../../components";

import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";

export default function Create({ setData }) {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [linkTrailer, setLinkTrailer] = useState("");
  const videoId = linkTrailer.slice(-11);
  const [description, setDescription] = useState("");
  const [mytags, setMytags] = useState([]);
  const tags = mytags.map((item) => item.value);
  const [isTrailer, setIsTrailer] = useState(false);
  const [isNews, setIsNews] = useState(false);
  const postType = isNews ? "news" : isTrailer ? "trailers" : "reviews";

  const elTagInput = useRef(null);
  const navigate = useNavigate();

  const handleAddTags = () => {
    if (!elTagInput.current.value || tags.length >= 6) return;
    const val = elTagInput.current.value.split(" ").join("").trim(" ");
    const newTags = [...mytags, { value: val, id: uuidv4() }];
    setMytags(newTags);
    elTagInput.current.value = "";
  };

  const handleDeleteTags = (id) => {
    const filteredTags = mytags.filter((item) => item.id !== id);
    setMytags(filteredTags);
  };

  const getZero = (num) => (num >= 10 ? num : `0${num}`);

  const date = new Date();
  const time = date.getTime();

  const createdAt = `${getZero(date.getDate())}.${getZero(
    date.getMonth() + 1
  )}.${date.getFullYear()} / ${getZero(date.getHours())}:${getZero(
    date.getMinutes()
  )}`;

  const [isLoading, setIsLoading] = useState(false);
  const postsCollectionRef = collection(db, postType);

  const createPost = async () => {
    if (!isTrailer) {
      if (media === null) return;
    } else if (title === "") return;

    if (!isTrailer) {
      const mediaRef = ref(storage, `images/${media.name + uuidv4()}`);
      try {
        setIsLoading(true);
        const uploadTask = uploadBytesResumable(mediaRef, media);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(postsCollectionRef, {
                lastEdited: "",
                title,
                shortDesc,
                description,
                tags,
                createdAt,
                likesList: [],
                time,
                type: postType,
                image: downloadURL,
              });
              setIsLoading(false);
              setData({ createdAt });
              navigate("/");
            });
          }
        );
      } catch {
        console.log("error");
      } finally {
        console.log("image uploaded");
      }
    } else {
      addDoc(postsCollectionRef, {
        lastEdited: "",
        title,
        description,
        videoId,
        image: `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
        tags,
        createdAt,
        likesList: [],
        time,
        type: postType,
      });
      setIsLoading(false);
      setData({ createdAt });
      navigate("/");
    }
  };

  return (
    <div className="create-edit container">
      {isLoading && <Loader />}
      <h2 className="create-edit__title">Yangi Post Yaratish</h2>
      <div className="create-edit__fields">
        {!isTrailer && (
          <label className="create-edit__label">
            <input
              className="create-edit__checkbox visually-hidden"
              type="checkbox"
              name="is_news"
              checked={isNews}
              onChange={(e) => setIsNews(e.target.checked)}
            />
            <span className="create-edit__fake-checkbox"></span>
            <span className="create-edit__label-inner">yangilik</span>
          </label>
        )}
        {!isNews && (
          <label className="create-edit__label">
            <input
              className="create-edit__checkbox visually-hidden"
              type="checkbox"
              name="is_news"
              checked={isTrailer}
              onChange={(e) => setIsTrailer(e.target.checked)}
            />
            <span className="create-edit__fake-checkbox"></span>
            <span className="create-edit__label-inner">treyler</span>
          </label>
        )}
      </div>
      {tags.length ? (
        <>
          <ul className="create-edit__tags">
            {mytags &&
              mytags.map((item) => (
                <li key={item.id} className="create-edit__tag">
                  <TagBadge id={item.id} handleDeleteTags={handleDeleteTags}>
                    {item.value}
                  </TagBadge>
                </li>
              ))}
          </ul>
        </>
      ) : (
        ""
      )}
      <div className="create-edit__fields">
        <input
          className="main-field create-edit__field create-edit__field--title"
          type="text"
          name="title"
          placeholder="sarlavha"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!isTrailer && (
          <input
            className="main-field create-edit__field create-edit__field--short-desc"
            type="text"
            name="short_description"
            placeholder="qisqa izoh"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        )}
      </div>
      <div className="create-edit__fields">
        {isTrailer && (
          <input
            className="main-field create-edit__field create-edit__field--short-desc"
            type="text"
            name="link_trailer"
            placeholder="Treylerga havola: https://youtu.be/6ECxfVvKan4"
            value={linkTrailer}
            onChange={(e) => setLinkTrailer(e.target.value)}
          />
        )}
      </div>
      <div className="create-edit__fields">
        <div className="create-edit__field-wrapper">
          <input
            className="main-field create-edit__field create-edit__field--tag"
            type="text"
            name="tags"
            placeholder="teglar"
            ref={elTagInput}
          />
          <button
            onClick={handleAddTags}
            className="admin-form__tag-button"
            type="button"
          >
            Teg qo'shish
          </button>
        </div>
        {!isTrailer && (
          <div className="create-edit__fields">
            <input
              className="create-edit__field create-edit__field--image visually-hidden"
              type="file"
              name="image"
              accept="image/*"
              id="image-input-create"
              placeholder="post rasmi"
              onChange={(e) => setMedia(e.target.files[0])}
            />
            <label
              className="main-field create-edit__field create-edit__field--image-label"
              htmlFor="image-input-create"
            >
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
          onChange={(e) => setDescription(e.target.value)}
        />

        {!isTrailer && (
          <img
            className="create-edit__img"
            src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"}
            alt=""
          />
        )}
      </div>
      <div className="create-edit__buttons">
        <Link to={"/"}>
          <button className="button button--blue">Bekor Qilish</button>
        </Link>
        <button
          className="button button--green"
          type="button"
          onClick={createPost}
        >
          Yaratish
        </button>
      </div>
    </div>
  );
}
