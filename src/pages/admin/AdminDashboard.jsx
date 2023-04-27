import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./AdminDashboard.scss";
import TagBadge from "../../components/tag-badge/TagBadge";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [mytags, setMytags] = useState([]);
  const tags = mytags.map((item) => item.value);

  const [isVideo, setisVideo] = useState(false);
  const [isNews, setIsNews] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
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
    const filteredTags = tags.filter((item) => item.id !== id);
    setMytags(filteredTags);
  };

  const getZero = (num) => (num >= 10 ? num : `0${num}`);

  const date = new Date();

  const createdAt = `${date.getHours()}:${date.getMinutes()} / ${getZero(
    date.getDate()
  )}.${getZero(date.getMonth() + 1)}.${date.getFullYear()}`;

  const postsCollectionRef = collection(db, `${isNews ? "news" : "reviews"}`);

  const createPost = async () => {
    if (media === null) return;

    const mediaRef = ref(
      storage,
      `/${isVideo ? "videos" : "images"}/${media.name + uuidv4()}`
    );

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
            addDoc(postsCollectionRef, {
              title,
              shortDesc,
              description,
              tags,
              createdAt,
              isVideo,
              image: isVideo ? "" : downloadURL,
              video: isVideo ? downloadURL : "",
            });
            navigate("/");
          });
        }
      );
    } catch {
      console.log("error");
    } finally {
      console.log("image uploaded");
    }
  };

  return (
    <section className="admin-dashboard">
      <div className="container">
        {!isNewPost && (
          <div className="admin-dashboard__btn-wrapper">
            <button
              className="button button--green"
              onClick={() => setIsNewPost(true)}
            >
              Yangi Post
            </button>
          </div>
        )}
        {isNewPost && (
          <form onSubmit={(e) => e.preventDefault()} className="form-admin">
            <h2 className="form-admin__title">Yangi Post Yaratish</h2>
            <div className="form-admin__fields">
              <label className="form-admin__label">
                <input
                  className="form-admin__checkbox visually-hidden"
                  type="checkbox"
                  name="is_news"
                  checked={isNews}
                  onChange={(e) => setIsNews(e.target.checked)}
                />
                <span className="form-admin__fake-checkbox"></span>
                <span className="form-admin__label-inner">yangilik</span>
              </label>
              <label className="form-admin__label">
                <input
                  className="form-admin__checkbox visually-hidden"
                  type="checkbox"
                  name="is_video"
                  // checked={isVideo}
                  onChange={(e) => {
                    // setisVideo(e.target.checked);
                    // setMedia(null);
                  }}
                />
                <span className="form-admin__fake-checkbox"></span>
                <span className="form-admin__label-inner">Video</span>
              </label>
            </div>
            {tags.length ? (
              <>
                <ul className="form-admin__tags">
                  {mytags &&
                    mytags.map((item) => (
                      <li key={item.id} className="form-admin__tag">
                        <TagBadge
                          id={item.id}
                          handleDeleteTags={handleDeleteTags}
                        >
                          {item.value}
                        </TagBadge>
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              ""
            )}
            <div className="form-admin__fields">
              <input
                className="form-admin__field form-admin__field--title"
                type="text"
                name="title"
                placeholder="sarlavha"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="form-admin__field form-admin__field--short-desc"
                type="text"
                name="short_description"
                placeholder="qisqa izoh"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>
            <div className="form-admin__fields">
              <div className="form-admin__field-wrapper">
                <input
                  className="form-admin__field form-admin__field--tag"
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
              <label className="form-admin__field form-admin__field--image-label">
                {media
                  ? `${isVideo ? "video" : "rasm"} tanlandi`
                  : `${isVideo ? "video" : "rasm"}ni tanlang`}
                <input
                  className="form-admin__field form-admin__field--image visually-hidden"
                  type="file"
                  name="image"
                  accept={`${isVideo ? "video" : "image"}/*`}
                  placeholder="post rasmi"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </label>
            </div>
            <div className="form-admin__fields">
              <textarea
                className="form-admin__textarea"
                name="description"
                placeholder="izoh"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {!isVideo && (
                <img
                  className="form-admin__img"
                  src={
                    media
                      ? URL.createObjectURL(media)
                      : "/images/temp-image.svg"
                  }
                  alt=""
                />
              )}
              {isVideo && (
                <video
                  className="form-admin__img"
                  autoPlay
                  src={media ? URL.createObjectURL(media) : ""}
                  alt=""
                />
              )}
            </div>
            <div className="form-admin__buttons">
              <button
                className="button button--blue"
                onClick={() => setIsNewPost(false)}
              >
                Bekor Qilish
              </button>
              <button
                className="button button--green"
                type="button"
                onClick={createPost}
              >
                Yaratish
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
