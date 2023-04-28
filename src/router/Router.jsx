import { Navigate, Route, Routes } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

// COMPONENTS
import Hero from "../components/hero/Hero";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Page404 from "../pages/404/404";
import CardsList from "../pages/main/CardsList";
import PostPage from "../pages/post-page/PostPage";
import About from "../pages/about/About";
import Create from "../pages/create-edit/Create";
import Edit from "../pages/create-edit/Edit";
import Tags from "../pages/tags/Tags";
import Settings from "../pages/settings/Settings";

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
      <Route path="/" element={<Hero />} />
      <Route
        path="/reviews"
        element={
          <CardsList
            setData={setData}
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
      <Route path="/settings" element={<Settings isAuth={isAuth} />} />
      <Route path="/about" element={<About />} />
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
