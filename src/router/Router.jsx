import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "../context/Context";

// Pages
import { Page404, About, Login, Register, AdminDashboard, CardsList, PostPage, Create, Edit, Settings, Home, Trailers, SearchResults, Users } from "../pages";

const Router = () => {
  const { state } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reviews" element={<CardsList />} />
      <Route path="/news" element={<CardsList />} />
      <Route path="/trailers" element={<Trailers />} />
      <Route path="/reviews/:id" element={<PostPage />} />
      <Route path="/news/:id" element={<PostPage />} />
      <Route path="/trailers/:id" element={<PostPage />} />
      <Route path={"/search/:query"} element={<SearchResults />} />
      <Route path="/about" element={<About />} />
      <Route path="/settings" element={<Settings />} />
      {!state.isAuth && (
        <Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      )}
      {state.isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      {state.isAdmin && <Route path="/admin/users" element={<Users />} />}
      {state.isAdmin && <Route path="/admin/create" element={<Create />} />}
      {state.isAdmin && <Route path="/admin/edit/:type/:id" element={<Edit />} />}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
