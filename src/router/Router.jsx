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

export default function Router({ isAdmin, isAuth, setIsAuth, loader }) {
  const [news, setNews] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getData = async (db, state = true) => {
    const stateText = state ? "news" : "reviews";
    const newsCollectionRef = collection(db, stateText);
    loader(true);
    const data = await getDocs(newsCollectionRef);
    const newData = data.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .sort((a, b) => b.time - a.time);

    console.log(newData);

    if (state) {
      setNews(newData);
    } else {
      setReviews(newData);
    }
    loader(false);
  };

  const deleteDataItem = (id, state) => {
    if (state) {
      setReviews(reviews.filter((item) => item.id !== id));
    } else {
      setNews(news.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    getData(db);
    getData(db, false);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route
        path="/reviews"
        element={
          <CardsList
            deleteDataItem={deleteDataItem}
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
            deleteDataItem={deleteDataItem}
            isAdmin={isAdmin}
            data={news}
            state={false}
          />
        }
      />
      <Route
        path="/reviews/:id"
        element={<PostPage arr={reviews} state={true} />}
      />
      <Route path="/news/:id" element={<PostPage arr={news} state={false} />} />
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
      {isAdmin && <Route path="/admin/create-post" element={<Create />} />}
      {isAdmin && (
        <Route
          path="/admin/edit-post/:type/:id"
          element={<Edit news={news} reviews={reviews} />}
        />
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
