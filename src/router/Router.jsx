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

export default function Router({ isAdmin, isAuth, setIsAuth, loader }) {
  const getData = (db, collectionType) => {
    const [data, setData] = useState([]);
    const newsCollectionRef = collection(db, collectionType);

    useEffect(() => {
      loader(true);
      const getArr = async () => {
        const data = await getDocs(newsCollectionRef);
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        loader(false);
      };

      getArr();
    }, []);

    return data;
  };


  const reviews = getData(db, "reviews");
  const news = getData(db, "news");
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route
        path="/reviews"
        element={<CardsList data={reviews} state={true} />}
      />
      <Route path="/news" element={<CardsList data={news} state={false} />} />
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
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
