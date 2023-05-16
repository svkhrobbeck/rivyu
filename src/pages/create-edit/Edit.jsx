// style
import "./CreateEdit.scss";

// components
import { TagBadge } from "../../components";

import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getZero } from "../../utils/utils";
import { Context } from "../../context/Context";

export default function Edit() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { state } = useContext(Context);
  const [data, setData] = useState({});

  const [media, setMedia] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [mytags, setMytags] = useState([]);
  const tags = mytags.map((item) => item.value);
  const elTagInput = useRef(null);
  const date = new Date();

  useEffect(() => {
    if (state.arr.length) {
      setData(state.arr.find((item) => item.id === id));
      setImage(data?.image);
      setTitle(data?.title);
      setShortDesc(data?.shortDesc);
      setDescription(data?.description);
      setMytags(
        data.tags ? data.tags.map((value) => ({ value, id: uuidv4() })) : []
      );
    }
  }, [state.arr, data]);

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

  function updatePostObj() {
    if (data.type === "trailers") {
      return {
        title,
        tags,
        description,
        lastEdited,
        image,
      };
    } else {
      return {
        ...data,
        title,
        shortDesc,
        tags,
        description,
        lastEdited,
        image,
      };
    }
  }

  const postRef = doc(db, type, id);
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
      await updateDoc(postRef, updatePostObj());
    }
    navigate(`/${data.type}`);
  };

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
        className="main-field create-edit__field create-edit__field--title"
        type="text"
        name="title"
        placeholder="sarlavha"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {data?.type !== "trailers" && (
        <input
          className="main-field create-edit__field create-edit__field--short-desc"
          type="text"
          name="short_description"
          placeholder="qisqa izoh"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
        />
      )}
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
      {data?.type !== "trailers" && (
        <>
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
        <Link to={`/${data?.type}`}>
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
