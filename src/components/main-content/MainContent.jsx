import React from "react";
import SideBar from "../side-bar/SideBar";
import Hero from "../hero/Hero";
import { Navigate, Route, Routes } from "react-router-dom";
import CardsList from "../cards-list/Cards";
import reviews from "../../data/reviews.json";
import news from "../../data/news.json";
import PostLayout from "../post-layout/PostLayout";

export default function MainContent({ isSitenavOpen, handleSitenavToggle }) {
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
            path="/reviews/post/:id"
            element={<PostLayout arr={reviews} state={true} />}
          />
          <Route
            path="/news"
            element={<CardsList data={news} state={false} />}
          />
          <Route
            path="/news/post/:id"
            element={<PostLayout arr={news} state={false} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
