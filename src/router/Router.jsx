import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  Page404,
  About,
  Login,
  Register,
  AdminDashboard,
  CardsList,
  PostPage,
  Create,
  Edit,
  Settings,
  Home,
  Trailers,
  SearchResults,
} from "../pages";
import { Context } from "../context/Context";

export default function Router() {
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
      <Route>
        <Route
          path="/register"
          element={state.isAuth ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="/login"
          element={state.isAuth ? <Navigate to={"/"} /> : <Login />}
        />
      </Route>

      {state.isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      {state.isAdmin && (
        <Route path="/admin/create-post" element={<Create />} />
      )}
      {state.isAdmin && (
        <Route path="/admin/edit-post/:type/:id" element={<Edit />} />
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
