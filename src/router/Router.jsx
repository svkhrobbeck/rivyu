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
} from "../pages";

export default function Router({ isAdmin, isAuth, setIsAuth, loader }) {
  const [news, setNews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState([]);

  const getData = async (db, state = true) => {
    const stateText = state ? "news" : "reviews";
    const newsCollectionRef = collection(db, stateText);
    const data = await getDocs(newsCollectionRef);
    const newData = data.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.time - a.time);

    if (state) {
      setNews(newData);
    } else {
      setReviews(newData);
    }
  };

  useEffect(() => {
    getData(db);
    getData(db, false);
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
          <CardsList
            setData={setData}
            isAuth={isAuth}
            isAdmin={isAdmin}
            data={reviews}
            state={true}
          />
        }
      />
      <Route
        path="/news"
        element={
          <CardsList
            setData={setData}
            isAuth={isAuth}
            isAdmin={isAdmin}
            data={news}
            state={false}
          />
        }
      />
      <Route
        path="/reviews/:id"
        element={
          <PostPage
            setData={setData}
            isAuth={isAuth}
            arr={reviews}
            state={true}
          />
        }
      />
      <Route
        path={"/tags/:tag"}
        element={<Tags news={news} reviews={reviews} />}
      />
      <Route
        path="/news/:id"
        element={
          <PostPage
            setData={setData}
            isAuth={isAuth}
            arr={news}
            state={false}
          />
        }
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
