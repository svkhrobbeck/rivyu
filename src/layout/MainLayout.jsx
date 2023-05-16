import { useCallback, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

// components
import Router from "../router/Router";
import { Header, Footer, SideBar } from "../components";
import { Context } from "../context/Context";

export default function MainLayout() {
  const [isSitenavOpen, setIsSitenavOpen] = useState(false);

  const { state, dispatch } = useContext(Context);

  const getData = useCallback(async () => {
    // refs
    const newsColRef = collection(db, "news");
    const reviewsColRef = collection(db, "reviews");
    const trailersColRef = collection(db, "trailers");

    // getted data
    const newsArr = await getDocs(newsColRef);
    const reviewsArr = await getDocs(reviewsColRef);
    const trailersArr = await getDocs(trailersColRef);

    // arrays
    const news = newsArr.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.time - a.time);

    const reviews = reviewsArr.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.time - a.time);

    const trailers = trailersArr.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.time - a.time);

    // data
    const data = { news, reviews, trailers };
    const arr = [...news, ...reviews, ...trailers].sort(
      (a, b) => b.time - a.time
    );

    dispatch({ type: "GET_DATA", payload: data });
    dispatch({ type: "GET_ARR", payload: arr });
  }, [state.arr]);

  const getAdminData = async (db, collectionType) => {
    const newsCollectionRef = collection(db, collectionType);
    const dataBack = await getDocs(newsCollectionRef);
    const newData = dataBack.docs.map((doc) => ({ ...doc.data() }));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        newData.forEach((item) => {
          if (
            state.isAuth &&
            localStorage.getItem("$U$I$D$") === item.adminToken &&
            localStorage.getItem("$U$I$D$") === uid
          ) {
            dispatch({ type: "SET_ADMIN", payload: true });
          }
        });
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const token = user.accessToken;
        if (
          uid === localStorage.getItem("$U$I$D$") &&
          localStorage.getItem("$T$O$K$E$N$") === token
        ) {
          dispatch({ type: "SET_AUTH", payload: true });
        } else {
          dispatch({ type: "SET_AUTH", payload: false });
        }
      } else {
        dispatch({ type: "SET_AUTH", payload: false });
        dispatch({ type: "SET_ADMIN", payload: false });
      }
    });
    getAdminData(db, "admin");
  }, [state.isAuth, state.isAdmin]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSitenavToggle = () => {
    setIsSitenavOpen((prev) => !prev);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <SideBar />
        <Router />
      </main>
      <Footer />
    </>
  );
}
