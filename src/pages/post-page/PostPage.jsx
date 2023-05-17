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

export default function PostPage() {
  const { state, dispatch } = useContext(Context);
  const id = useParams().id;
  const [isShowToast, setIsShowToast] = useState(false);
  const [isShowFailureToast, setIsShowFailureToast] = useState(false);
  const handleCloseSuccessToast = () => setIsShowToast(false);
  const handleOpenSuccessToast = () => setIsShowToast(true);
  const handleCloseFailureToast = () => setIsShowFailureToast(false);
  const handleOpenFailureToast = () => setIsShowFailureToast(true);

  const filteredArr = state.arr.filter((item) => item.id !== id);
  const data = state.arr.find((item) => item.id === id) || {};
  const isTrailer = data.type === "trailers";

  const stateText =
    data.type === "reviews"
      ? "tahlil"
      : data.type === "trailers"
      ? "treyler"
      : "yangilik";
  const stateTitle = `So'nggi ${stateText}lar`;

  const updateLike = async () => {
    const docRef = doc(db, data.type, id);

    onAuthStateChanged(auth, (user) => {
      if (state.isAuth) {
        if (user) {
          if (!data.likesList.includes(user.uid)) {
            updateDoc(docRef, {
              likesList: [...data.likesList, user.uid],
            });
          } else {
            data.likesList = data.likesList.filter((item) => item !== user.uid);
            updateDoc(docRef, {
              likesList: [...data.likesList],
            });
          }
          dispatch({ type: "IS_UPDATED" });
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
            {!isTrailer && (
              <>
                {data.image && (
                  <img
                    className="post__image"
                    src={data.image}
                    alt={data.title}
                  />
                )}
              </>
            )}
            {isTrailer && (
              <iframe
                className="post__iframe"
                width="640"
                height="355"
                src={`https://www.youtube-nocookie.com/embed/${data.videoId}`}
                title={data.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}

            <div className="post__time-like-wrapper">
              <time className="post__time" dateTime={data.createdAt}>
                {data.image ? data.createdAt : "yuklanmoqda..."}
              </time>
              <div className="post__buttons-wrapper">
                <button onClick={copyLink} className="post__button">
                  <img src="/images/icon-link.svg" alt="" />
                </button>
                <button onClick={updateLike} className="post__button">
                  {data?.likesList && <span>{data?.likesList?.length}</span>}
                  {!data?.likesList && (
                    <img src="/images/rolling-spinner.svg" alt="" />
                  )}
                  <img
                    src={`/images/icon-${
                      data.likesList?.includes(localStorage.getItem("$U$I$D$"))
                        ? "like"
                        : "unlike"
                    }.svg`}
                    alt=""
                  />
                </button>
              </div>
            </div>
            {data.image && (
              <>
                <h2 className="post__title">{data.title}</h2>
                <p className="post__description">{data.description}</p>
                <ul className="post__tags">
                  {data.tags &&
                    data.tags.map((item) => (
                      <li key={item} className="post__tag">
                        <Link to={`/tags/${item}`}>{item}</Link>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="post-page__side-bar">
          <MiniSideBar
            arr={filteredArr
              .filter((item) => item?.type === data?.type)
              .slice(0, 6)}
            title={stateTitle}
          />
        </div>
      </div>
      <Toast handleClose={handleCloseSuccessToast} isOpen={isShowToast}>
        Havola nusxalandi!
      </Toast>
      <Toast
        isSuccess={false}
        handleClose={handleCloseFailureToast}
        isOpen={isShowFailureToast}
      >
        Hisobga kirmagansiz!
      </Toast>
    </section>
  );
}
