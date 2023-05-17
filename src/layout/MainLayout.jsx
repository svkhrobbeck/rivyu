import { useCallback, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";

// components
import Router from "../router/Router";
import { Header, Footer, SideBar } from "../components";
import { Context } from "../context/Context";

export default function MainLayout() {
  const { state, dispatch } = useContext(Context);

  const getUserData = async () => {
    const newsCollectionRef = doc(db, "users", "users");
    const dataBack = await getDoc(newsCollectionRef);
    const newData = dataBack.data();

    newData.admins.forEach((item) => {
      if (localStorage.getItem("$U$I$D$") === item.uid) {
        dispatch({ type: "SET_ADMIN", payload: true });
        dispatch({ type: "IS_UPDATED" });
        console.log("admined");
      }
    });
  };

  const getData = useCallback(async () => {
    // refs
    const newsColRef = collection(db, "news");
    const reviewsColRef = collection(db, "reviews");
    const trailersColRef = collection(db, "trailers");
    const usersColRef = doc(db, "users", "users");

    // getted data
    const newsArr = await getDocs(newsColRef);
    const reviewsArr = await getDocs(reviewsColRef);
    const trailersArr = await getDocs(trailersColRef);
    const usersArr = await getDoc(usersColRef);

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

    const users = usersArr.data();
    const user =
      [...users.users, ...users.admins].find(
        (item) => item.uid === localStorage.getItem("$U$I$D$")
      ) || {};

    // data
    const data = { news, reviews, trailers };
    const arr = [...news, ...reviews, ...trailers].sort(
      (a, b) => b.time - a.time
    );

    dispatch({ type: "GET_DATA", payload: data });
    dispatch({ type: "GET_ARR", payload: arr });
    dispatch({ type: "GET_USERS", payload: users });
    dispatch({
      type: "GET_USER",
      payload: user,
    });
    console.log("fetched");
  }, [state.isUpdated]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, accessToken } = user;
        if (
          uid === localStorage.getItem("$U$I$D$") &&
          localStorage.getItem("$T$O$K$E$N$") === accessToken
        ) {
          dispatch({ type: "SET_AUTH", payload: true });
          getUserData();
        } else {
          dispatch({ type: "SET_AUTH", payload: false });
          localStorage.clear();
        }
      } else {
        dispatch({ type: "SET_AUTH", payload: false });
        dispatch({ type: "SET_ADMIN", payload: false });
      }
    });
  }, [state.isAuth]);

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
