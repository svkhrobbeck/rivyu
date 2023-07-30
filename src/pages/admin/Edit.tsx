// style
import "./Admin.scss";

// components
import { TagBadge } from "../../components";

import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseLink, imageKitLink } from "../../helpers/constants";
import { Helmet } from "react-helmet";
import usePosts from "../../hooks/usePosts";
import usePostsStore from "../../store/posts.store";

interface ITags {
  value: string;
  id: string;
}

type IParams = {
  type: "reviews" | "trailers" | "news";
  id: string;
};

const Edit: FC = (): JSX.Element => {
  const { post } = usePostsStore();
  const { getPost } = usePosts();
  const navigate = useNavigate();
  const { type, id } = useParams() as IParams;
  const dataRef = doc(db, type, id);

  const [media, setMedia] = useState<Blob | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [myTags, setMyTags] = useState<ITags[]>([] as ITags[]);
  const [tags, setTags] = useState<string>("");

  const handleAddTags = (): void => {
    if (!tags.trim() || tags.length >= 6) return;
    const value = tags.split(" ").join("").trim();
    const newTags = [...myTags, { value, id: uuidv4() }];
    setMyTags(newTags);
    setTags("");
  };

  const handleDelTags = (id: string) => {
    const tags = myTags.filter(item => item.id !== id);
    setMyTags(tags);
  };

  getPost(type, id);

  const getData = () => {
    setImage(post.image);
    setTitle(post.title);
    setShortDesc(post.shortDesc);
    setDescription(post.description);
    setMyTags(post?.tags?.map(item => ({ value: item, id: uuidv4() })));
  };

  useEffect(() => getData(), [post]);

  const updatePostObj = () => {
    return {
      title,
      shortDesc,
      tags: myTags?.map(item => item.value),
      description,
      lastEdited: Date.now(),
      image,
    };
  };

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
              updateDoc(dataRef, {
                lastEdited: Date.now(),
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
      await updateDoc(dataRef, updatePostObj());
    }
    navigate("/");
  };

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
      {type !== "trailers" && (
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
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {!media && (
          <img
            className="create-edit__img"
            src={image ? image?.replace(firebaseLink, imageKitLink) : "/images/temp-image.svg"}
            alt="post image"
          />
        )}
        {media && <img className="create-edit__img" src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"} alt="post image" />}
      </div>
      <div className="create-edit__buttons">
        <Link className="button button--blue" to="/">
          Bekor Qilish
        </Link>
        <button className="button button--green" type="button" onClick={updatePost}>
          Yangilash
        </button>
      </div>
    </div>
  );
};

export default Edit;
