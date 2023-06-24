// style
import "./PostPage.scss";

// components
import { MiniSideBar, Toast } from "../../components";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Context } from "../../context/Context";
import { getLocalStorage } from "../../utils/SetGetLocalStorage";
import { youtubeThumb } from "../../constants";

const PostPage = () => {
  const { state } = useContext(Context);
  const { id } = useParams();

  const [isShowToast, setIsShowToast] = useState(false);
  const [isShowFailureToast, setIsShowFailureToast] = useState(false);
  const handleCloseSuccessToast = () => setIsShowToast(false);
  const handleOpenSuccessToast = () => setIsShowToast(true);
  const handleCloseFailureToast = () => setIsShowFailureToast(false);
  const handleOpenFailureToast = () => setIsShowFailureToast(true);

  const filteredArr = state.arr.filter(item => item.id !== id);
  const data = state.arr.find(item => item.id === id) || {};
  const isTrailer = data.type === "trailers";

  const stateText = data.type === "reviews" ? "maqola" : data.type === "trailers" ? "treyler" : "yangilik";
  const stateTitle = `So'nggi ${stateText}lar`;

  const updateLike = async () => {
    const docRef = doc(db, data.type, id);

    onAuthStateChanged(auth, user => {
      if (state.isAuth) {
        if (user) {
          if (!data.likesList.includes(user.uid)) {
            updateDoc(docRef, {
              likesList: [...data.likesList, user.uid],
            });
          } else {
            data.likesList = data.likesList.filter(item => item !== user.uid);
            updateDoc(docRef, {
              likesList: [...data.likesList],
            });
          }
        }
      } else {
        handleOpenFailureToast();
        setTimeout(handleCloseFailureToast, 3000);
      }
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      handleOpenSuccessToast();
      setTimeout(handleCloseSuccessToast, 3000);
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
            {data.image && <span className="post__badge">{stateText}</span>}
            {!isTrailer && <>{data.image && <img className="post__image" src={data.image} alt={data.title} />}</>}
            {isTrailer && (
              <iframe
                className="post__iframe"
                width="640"
                height="355"
                src={`${youtubeThumb}${data.videoId}`}
                title={data.title}
                allow="autoplay; picture-in-picture;"
                allowFullScreen
              ></iframe>
            )}

            <div className="post__time-like-wrapper">
              <time className="post__time" dateTime={data.createdAt}>
                {data.image ? data.createdAt : "yuklanmoqda..."}
              </time>
              <div className="post__buttons-wrapper">
                <button onClick={copyLink} className="post__button">
                  <img src="/images/icon-link.svg" />
                </button>
                <button onClick={updateLike} className="post__button">
                  {data?.likesList && <span>{data?.likesList?.length}</span>}
                  {!data?.likesList && <img src="/images/rolling-spinner.svg" />}
                  <img src={`/images/icon-${data.likesList?.includes(getLocalStorage("$U$I$D$")) ? "like" : "unlike"}.svg`} />
                </button>
              </div>
            </div>
            {data.image && (
              <>
                <h2 className="post__title">{data.title}</h2>
                <p className="post__description">{data.description}</p>
                {data.tags.length ? (
                  <ul className="post__tags">
                    {data.tags &&
                      data.tags.map(item => (
                        <li key={item} className="post__tag">
                          <Link to={`/search/${item.toLowerCase()}`}>{item}</Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className="post-page__side-bar">
          <MiniSideBar arr={filteredArr.filter(({ type }) => type === data?.type).slice(0, 6)} title={stateTitle} />
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
