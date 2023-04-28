import { useEffect, useState } from "react";
import "./PostPage.scss";
import { Link, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function PostPage({ isAuth, setData, arr, state = false }) {
  const id = useParams().id;

  const data = arr.find((item) => item.id === id)
    ? arr.find((item) => item.id === id)
    : {};
  const stateText = state ? "reviews" : "news";

  const updateLike = async () => {
    const docRef = doc(db, stateText, id);

    onAuthStateChanged(auth, (user) => {
      if (!localStorage.getItem("$U$I$D$") || !isAuth) return;
      if (user.uid !== localStorage.getItem("$U$I$D$")) return;
      if (user) {
        const itemObj = { ...data };
        if (!itemObj.likesList.includes(user.uid)) {
          updateDoc(docRef, {
            likesList: [...itemObj.likesList, user.uid],
          });
        } else {
          itemObj.likesList = itemObj.likesList.filter(
            (item) => item !== user.uid
          );
          updateDoc(docRef, {
            likesList: [...itemObj.likesList],
          });
        }
        setData(arr);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="post-page">
      <div className="post-page__inner container">
        <div className="post">
          <div className="post__inner">
            <span className="post__badge">{state ? "Tahlil" : "Xabar"}</span>

            <img className="post__image" src={data.image} alt={data.title} />

            <div className="post__time-like-wrapper">
              <time className="post__time" dateTime={data.createdAt}>
                {data.createdAt}
              </time>
              <button onClick={updateLike} className="post__like-button">
                <span>{data?.likesList?.length}</span>
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
            <h2 className="post__title" data-post-layout-title>
              {data.title}
            </h2>
            <p className="post__description" data-post-layout-desc>
              {data.description}
            </p>
            <ul className="post__tags" data-post-layout-tags>
              {data.tags &&
                data.tags.map((item) => (
                  <li key={item} className="post__tag">
                    <a className="post__tag-link" href="">
                      {item}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mini-sidebar">
          <h3 className="mini-sidebar__title">
            So'nggi {state ? "tahlillar" : "yangiliklar"}
          </h3>
          <ul className="mini-sidebar__list" data-post-layout-list>
            {arr &&
              arr.map((item) => (
                <li
                  onClick={() => (document.documentElement.scrollTop = 0)}
                  key={item.id}
                  className="mini-sidebar__item"
                >
                  <Link to={`/${state ? "reviews" : "news"}/${item.id}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
