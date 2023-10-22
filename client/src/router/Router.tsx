// fc
import { FC } from "react";
// routes
import { Route, Routes } from "react-router-dom";
// Pages
import { Admin, Create, Edit, Home, Page404, Post, Search, Users } from "@pages/index";

const Router: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:type/:slug" element={<Post />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/create" element={<Create />} />
      <Route path="/edit/:slug" element={<Edit />} />
      <Route path={"/search/:query"} element={<Search />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
