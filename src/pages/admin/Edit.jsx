// style
import "./AdminDashboard.scss";

// components
import { TagBadge } from "../../components";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseLink, imageKitLink, lastEdited } from "../../constants";

const Edit = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const dataRef = doc(db, type, id);

  const [media, setMedia] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [myTags, setMyTags] = useState([]);
  const tags = myTags.map(item => item.value);
  const elTagInput = useRef(null);

  const handleAddTags = () => {
    if (!elTagInput.current.value || tags.length >= 6) return;
    const val = elTagInput.current.value.split(" ").join("").trim("");
    const newTags = [...myTags, { value: val, id: uuidv4() }];
    setMyTags(newTags);
    elTagInput.current.value = "";
  };

  const handleDelTags = id => {
    const tags = myTags.filter(item => item.id !== id);
    setMyTags(tags);
  };

  const getData = async () => {
    const data = (await getDoc(dataRef)).data();

    // sets
    setImage(data.image);
    setTitle(data.title);
    setShortDesc(data.shortDesc);
    setDescription(data.description);
    setMyTags(data.tags.map(item => ({ value: item, id: uuidv4() })));
  };

  useEffect(() => {
    getData();
  }, []);

  function updatePostObj() {
    if (type === "trailers") {
      return {
        title,
        tags,
        description,
        lastEdited,
        image,
      };
    } else {
      return {
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
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              updateDoc(postRef, {
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
    navigate(`/${type}`);
  };

  return (
    <div className="create-edit container">
      <h2 className="create-edit__title">Postni Yangilash</h2>
      {!!tags.length ? (
        <>
          <ul className="create-edit__tags">
            {myTags &&
              myTags.map(item => (
                <li key={item.id} className="create-edit__tag">
                  <TagBadge id={item.id} handleDeleteTags={handleDelTags}>
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
        onChange={e => setTitle(e.target.value)}
      />
      {type !== "trailers" && (
        <input
          className="main-field create-edit__field create-edit__field--short-desc"
          type="text"
          name="short_description"
          placeholder="qisqa izoh"
          value={shortDesc}
          onChange={e => setShortDesc(e.target.value)}
        />
      )}
      <div className="create-edit__field-wrapper">
        <input className="main-field create-edit__field create-edit__field--tag" type="text" name="tags" placeholder="teglar" ref={elTagInput} />
        <button onClick={handleAddTags} className="admin-form__tag-button" type="button">
          Teg qo'shish
        </button>
      </div>
      {type !== "trailers" && (
        <>
          <input
            className="create-edit__field create-edit__field--image visually-hidden"
            type="file"
            name="image"
            accept="image/*"
            placeholder="post rasmi"
            id="image-input-edit"
            onChange={e => setMedia(e.target.files[0])}
          />
          <label className="main-field create-edit__field create-edit__field--image-label create-edit__field--image-label-block" htmlFor="image-input-edit">
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
          onChange={e => setDescription(e.target.value)}
        />
        {!media && <img className="create-edit__img" src={image ? image?.replace(firebaseLink, imageKitLink) : "/images/temp-image.svg"} alt="" />}
        {media && <img className="create-edit__img" src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"} alt="" />}
      </div>
      <div className="create-edit__buttons">
        <Link to={`/${type}`}>
          <button className="button button--blue">Bekor Qilish</button>
        </Link>
        <button className="button button--green" type="button" onClick={updatePost}>
          Yangilash
        </button>
      </div>
    </div>
  );
};

export default Edit;
