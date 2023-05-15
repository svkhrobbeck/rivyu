import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

import {
  Page404,
  About,
  Login,
  Register,
  AdminDashboard,
  CardsList,
  PostPage,
  Create,
  Edit,
  Tags,
  Settings,
  Home,
  Trailers,
} from "../pages";

export default function Router({ isAdmin, isAuth, setIsAuth, loader }) {
  const [news, setNews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [data, setData] = useState([]);

  const getData = async (db, stateText = "reviews") => {
    const newsCollectionRef = collection(db, stateText);
    const data = await getDocs(newsCollectionRef);
    const newData = data.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.time - a.time);

    if (stateText === "reviews") {
      setReviews(newData);
    } else if (stateText === "news") {
      setNews(newData);
    } else if (stateText === "trailers") {
      setTrailers(newData);
    }
  };

  useEffect(() => {
    getData(db);
    getData(db, "news");
    getData(db, "trailers");
  }, [data]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home data={[...news, ...reviews].sort((a, b) => b.time - a.time)} />
        }
      />
      <Route
        path="/reviews"
        element={
          <CardsList setData={setData} isAdmin={isAdmin} data={reviews} />
        }
      />
      <Route
        path="/news"
        element={<CardsList setData={setData} isAdmin={isAdmin} data={news} />}
      />
      <Route path="/trailers" element={<Trailers trailers={trailers} />} />
      <Route
        path="/reviews/:id"
        element={<PostPage setData={setData} isAuth={isAuth} arr={reviews} />}
      />
      <Route
        path="/news/:id"
        element={<PostPage setData={setData} isAuth={isAuth} arr={news} />}
      />
      <Route
        path="/trailers/:id"
        element={<PostPage setData={setData} isAuth={isAuth} arr={trailers} />}
      />
      <Route path="/trailers/:id" element={""} />
      <Route
        path={"/tags/:tag"}
        element={<Tags data={[...reviews, ...news, ...trailers]} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/settings" element={<Settings isAuth={isAuth} />} />
      <Route>
        <Route
          path="/register"
          element={
            isAuth ? <Navigate to={"/"} /> : <Register setIsAuth={setIsAuth} />
          }
        />
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to={"/"} /> : <Login setIsAuth={setIsAuth} />
          }
        />
      </Route>

      {isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      {isAdmin && (
        <Route
          path="/admin/create-post"
          element={<Create setData={setData} />}
        />
      )}
      {isAdmin && (
        <Route
          path="/admin/edit-post/:type/:id"
          element={<Edit setData={setData} news={news} reviews={reviews} />}
        />
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
