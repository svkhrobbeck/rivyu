import { useCallback, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

// components
import Router from "../router/Router";
import { Header, Footer, SideBar } from "../components";
import { Context } from "../context/Context";
import { getLocalStorage } from "../utils/utils";

export default function MainLayout() {
  const { state, dispatch } = useContext(Context);
  const newsRef = collection(db, "news");
  const reviewsRef = collection(db, "reviews");
  const trailersRef = collection(db, "trailers");
  const usersRef = doc(db, "users", "users");

  const getUserData = async () => {
    const data = (await getDoc(usersRef)).data();

    data.admins.forEach(({ uid }) => {
      if (getLocalStorage("$U$I$D$") === uid) dispatch({ type: "SET_ADMIN", payload: true });
    });
  };

  const getData = async () => {
    const newsArr = await getDocs(newsRef);
    const reviewsArr = await getDocs(reviewsRef);
    const trailersArr = await getDocs(trailersRef);
    const { users, admins } = (await getDoc(usersRef)).data();

    // arrays
    const news = newsArr.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.time - a.time);
    const reviews = reviewsArr.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.time - a.time);
    const trailers = trailersArr.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => b.time - a.time);

    const user = [...users, ...admins].find(({ uid }) => uid === getLocalStorage("$U$I$D$")) || {};
    const data = { news, reviews, trailers };
    const arr = [...news, ...reviews, ...trailers].sort((a, b) => b.time - a.time);

    dispatch({ type: "GET_DATA", payload: data });
    dispatch({ type: "GET_ARR", payload: arr });
    dispatch({ type: "GET_USERS", payload: users });
    dispatch({ type: "GET_USER", payload: user });
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { accessToken } = user;
        if (getLocalStorage("$T$O$K$E$N$") === accessToken) {
          dispatch({ type: "SET_AUTH", payload: true });
          getUserData();
        } else {
          dispatch({ type: "SET_AUTH", payload: false });
          localStorage.clear();
        }
      } else {
        dispatch({ type: "SET_AUTH", payload: false });
      }
    });
  }, [state.isAuth]);

  useEffect(() => {
    onSnapshot(query(newsRef), () => {
      getData();
    });

    onSnapshot(query(trailersRef), () => {
      getData();
    });

    onSnapshot(query(reviewsRef), () => {
      getData();
    });

    onSnapshot(usersRef, () => {
      getData();
    });
  }, []);

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
