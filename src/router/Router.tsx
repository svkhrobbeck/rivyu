import { FC } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import { Page404, About, Posts, Post, Admin, Create, Edit, Home, Trailers, SearchResults, Users } from "../pages";

const Router: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<Posts />} />
      <Route path="/reviews" element={<Posts />} />
      <Route path="/trailers" element={<Trailers />} />
      <Route path="/:type/:id" element={<Post />} />
      <Route path={"/search/:query"} element={<SearchResults />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:type/:id" element={<Edit />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
