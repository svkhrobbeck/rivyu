import SideBar from "../side-bar/SideBar";
import Hero from "../hero/Hero";
import { Navigate, Route, Routes } from "react-router-dom";
import CardsList from "../cards-list/Cards";
import PostLayout from "../post-layout/PostLayout";
import useData from "../../hooks/useDate";
import db from "../../firebase/firebase";

export default function MainContent({ isSitenavOpen, handleSitenavToggle }) {
  const reviews = useData(db, "reviews");
  const news = useData(db, "news");
  return (
    <>
      <main className="main-content">
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
          <Route
            path="/news"
            element={<CardsList data={news} state={false} />}
          />
          <Route
            path="/news/:id"
            element={<PostLayout arr={news} state={false} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
