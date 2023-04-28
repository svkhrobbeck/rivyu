import "./CreateEdit.scss";
import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import TagBadge from "../../components/tag-badge/TagBadge";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Edit({ setData, news, reviews }) {
  const navigate = useNavigate();
  const { type: paramType, id: paramId } = useParams();
  const arr = paramType === "news" ? news : reviews;
  const data = arr.find((item) => item.id === paramId);
  const [media, setMedia] = useState(null);
  const [image, _] = useState(data.image);
  const [title, setTitle] = useState(data.title);
  const [shortDesc, setShortDesc] = useState(data.shortDesc);
  const [description, setDescription] = useState(data.description);
  const [mytags, setMytags] = useState(
    data.tags.map((value) => ({ value, id: uuidv4() }))
  );
  const tags = mytags.map((item) => item.value);
  const elTagInput = useRef(null);
  const date = new Date();
  const getZero = (num) => (num >= 10 ? num : `0${num}`);

  const lastEdited = `${getZero(date.getDate())}.${getZero(
    date.getMonth() + 1
  )}.${date.getFullYear()} / ${getZero(date.getHours())}:${getZero(
    date.getMinutes()
  )}`;

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

  const postRef = doc(db, paramType, paramId);
  const updatePost = async () => {
    if (media !== null) {
      const mediaRef = ref(storage, `images/${media.name + uuidv4()}`);
      try {
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
              updateDoc(postRef, {
                ...data,
                lastEdited,
                title,
                shortDesc,
                tags,
                description,
                image: downloadURL,
              });
            });
          }
        );
      } catch {
        console.log("error");
      } finally {
        console.log("image uploaded");
      }
    } else {
      await updateDoc(postRef, {
        ...data,
        title,
        shortDesc,
        tags,
        description,
        likesList: [],
        lastEdited,
        image: image,
      });
    }
    setData(arr);
    navigate(`/${paramType}`);
  };

  console.log(paramType);

  return (
    <div className="create-edit container">
      <h2 className="create-edit__title">Postni Yangilash</h2>
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
      <input
        className="create-edit__field create-edit__field--title"
        type="text"
        name="title"
        placeholder="sarlavha"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="create-edit__field create-edit__field--short-desc"
        type="text"
        name="short_description"
        placeholder="qisqa izoh"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
      />
      <div className="create-edit__field-wrapper">
        <input
          className="create-edit__field create-edit__field--tag"
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
      <input
        className="create-edit__field create-edit__field--image visually-hidden"
        type="file"
        name="image"
        accept="image/*"
        placeholder="post rasmi"
        id="image-input-edit"
        onChange={(e) => setMedia(e.target.files[0])}
      />
      <label
        htmlFor="image-input-edit"
        className="create-edit__field create-edit__field--image-label create-edit__field--image-label-block"
      >
        {media ? "rasm tanlandi" : "rasmni tanlang"}
      </label>
      <div className="create-edit__fields">
        <textarea
          className="create-edit__textarea"
          name="description"
          placeholder="izoh"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {!media && (
          <img
            className="create-edit__img"
            src={image ? image : "/images/temp-image.svg"}
            alt=""
          />
        )}
        {media && (
          <img
            className="create-edit__img"
            src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"}
            alt=""
          />
        )}
      </div>
      <div className="create-edit__buttons">
        <Link to={`/${paramType}`}>
          <button className="button button--blue">Bekor Qilish</button>
        </Link>
        <button
          className="button button--green"
          type="button"
          onClick={updatePost}
        >
          Yangilash
        </button>
      </div>
    </div>
  );
}
