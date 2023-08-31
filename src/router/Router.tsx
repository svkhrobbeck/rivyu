// fc
import { FC } from "react";
// routes
import { Route, Routes } from "react-router-dom";
// Pages
import { About, Admin, Create, Edit, Home, Page404, Post, Posts, Search, Trailers, Users } from "@pages/index";

const Router: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<Posts />} />
      <Route path="/reviews" element={<Posts />} />
      <Route path="/trailers" element={<Trailers />} />
      <Route path="/:type/:id" element={<Post />} />
      <Route path={"/search/:query"} element={<Search />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:type/:id" element={<Edit />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
