import SideBar from "../side-bar/SideBar";
import Hero from "../hero/Hero";
import { Navigate, Route, Routes } from "react-router-dom";
import CardsList from "../cards-list/Cards";
import PostLayout from "../post-layout/PostLayout";
import db from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import Loader from "../loader/Loader";
import Page404 from "../404/404";

export default function MainContent({ isSitenavOpen, handleSitenavToggle }) {
  const [isLoader, setIsLoader] = useState(true);
  const reviews = getData(db, "reviews");
  const news = getData(db, "news");

  function getData(db, collectionType) {
    const [data, setData] = useState([]);
    const newsCollectionRef = collection(db, collectionType);

    useEffect(() => {
      setIsLoader(true);
      const getArr = async () => {
        const data = await getDocs(newsCollectionRef);
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoader(false);
      };

      getArr();
    }, []);

    return data;
  }

  return (
    <main className="main-content">
      {isLoader && <Loader />}
      <SideBar
        isSitenavOpen={isSitenavOpen}
        handleSitenavToggle={handleSitenavToggle}
      />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/reviews"
          element={<CardsList data={reviews} state={true} />}
        />
        <Route
          path="/reviews/:id"
          element={<PostLayout arr={reviews} state={true} />}
        />
        <Route path="/news" element={<CardsList data={news} state={false} />} />
        <Route
          path="/news/:id"
          element={<PostLayout arr={news} state={false} />}
        />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
    </main>
  );
}
