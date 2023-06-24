// style
import "./PostPage.scss";

// components
import { MiniSideBar, Toast } from "../../components";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Context } from "../../context/Context";
import { getLocalStorage } from "../../utils/SetGetLocalStorage";
import { firebaseLink, imageKitLink, youtubeThumb } from "../../constants";
import { copyLink } from "../../utils/copyLink";

const PostPage = () => {
  const { state } = useContext(Context);
  const { type, id } = useParams();
  const dataRef = doc(db, type, id);

  const [isShowToast, setIsShowToast] = useState(false);
  const [isShowFailureToast, setIsShowFailureToast] = useState(false);
  const handleCloseSuccessToast = () => setIsShowToast(false);
  const handleOpenSuccessToast = () => setIsShowToast(true);
  const handleCloseFailureToast = () => setIsShowFailureToast(false);
  const handleOpenFailureToast = () => setIsShowFailureToast(true);
  const [{ image, title, tags, videoId, createdAt, likesList, ...data }, setData] = useState({});
  const isTrailer = type === "trailers";
  const stateText = type === "reviews" ? "maqola" : type === "trailers" ? "treyler" : "yangilik";
  const stateTitle = `So'nggi ${stateText}lar`;

  const getData = useCallback(async () => {
    const data = (await getDoc(dataRef)).data();
    setData(data);
  }, [id]);

  useEffect(() => {
    onSnapshot(dataRef, getData);
  }, [getData]);

  const updateLike = () => {
    onAuthStateChanged(auth, user => {
      if (state.isAuth) {
        if (!likesList.includes(user.uid)) {
          updateDoc(dataRef, {
            likesList: [...likesList, user.uid],
          });
        } else {
          updateDoc(dataRef, {
            likesList: [...likesList.filter(uid => uid !== user.uid)],
          });
        }
      } else {
        handleOpenFailureToast();
        setTimeout(handleCloseFailureToast, 3000);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="post-page">
      <div className="post-page__inner container">
        <div className="post-page__post post">
          <div className="post__inner">
            {image && <span className="post__badge">{stateText}</span>}
            {!isTrailer && <>{image && <img className="post__image" src={image?.replace(firebaseLink, imageKitLink)} alt={title} />}</>}
            {isTrailer && (
              <iframe
                className="post__iframe"
                width="640"
                height="355"
                src={`${youtubeThumb}${videoId}`}
                title={title}
                allow="autoplay; picture-in-picture;"
                allowFullScreen
              ></iframe>
            )}

            <div className="post__time-like-wrapper">
              <time className="post__time" dateTime={createdAt}>
                {image ? createdAt : "yuklanmoqda..."}
              </time>
              <div className="post__buttons-wrapper">
                <button onClick={() => copyLink(handleOpenSuccessToast, handleCloseSuccessToast)} className="post__button">
                  <img src="/images/icon-link.svg" />
                </button>
                <button onClick={updateLike} className="post__button">
                  {likesList && <span>{likesList?.length}</span>}
                  {!likesList && <img src="/images/rolling-spinner.svg" />}
                  <img src={`/images/icon-${likesList?.includes(getLocalStorage("$U$I$D$")) ? "like" : "unlike"}.svg`} />
                </button>
              </div>
            </div>
            {image && (
              <>
                <h2 className="post__title">{title}</h2>
                <p className="post__description">{data.description}</p>
                {tags.length ? (
                  <ul className="post__tags">
                    {tags &&
                      tags.map(tag => (
                        <li key={tag} className="post__tag">
                          <Link to={`/search/${tag.toLowerCase()}`}>{tag}</Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className="post-page__side-bar">
          <MiniSideBar arr={state.arr.filter(item => item.type === type && item.id !== id).slice(0, 6)} title={stateTitle} />
        </div>
      </div>
      <Toast handleClose={handleCloseSuccessToast} isOpen={isShowToast}>
        Havola nusxalandi!
      </Toast>
      <Toast isSuccess={false} handleClose={handleCloseFailureToast} isOpen={isShowFailureToast}>
        Hisobga kirmagansiz!
      </Toast>
    </section>
  );
};

export default PostPage;
