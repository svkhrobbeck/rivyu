// style
import "./Home.scss";

// components
import { Search, MiniSideBar, FavoritePost, Loader } from "../../components";

import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {
  document.title = "Kino Blog | Bosh sahifa";

  const { state } = useContext(Context);

  return (
    <section className="home">
      <div className="container home__inner">
        <div className="home__content">
          <Search />
          <FavoritePost />
        </div>
        <div className="home__side-bar">
          <MiniSideBar arr={state?.arr?.slice(1, 8)} title="So'nggi yangiliklar" state="news" />
        </div>
      </div>
    </section>
  );
}
