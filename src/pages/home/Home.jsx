// style
import "./Home.scss";

// components
import { Search, MiniSideBar, FavoritePost, Card } from "../../components";

import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";

export default function Home() {
  document.title = "Kino Blog | Bosh sahifa";

  const { state } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="home">
      <div className="container">
        <div className="home__inner">
          <div className="home__content">
            <Search />
            <FavoritePost />
          </div>
          <div className="home__side-bar">
            <MiniSideBar arr={state?.arr?.slice(1, 8)} title="So'nggi yangiliklar" state="news" />
          </div>
        </div>
        <div className="home__posts posts-home">
          <div className="posts-home__inner">{!!state.arr?.length && state.arr?.filter((_, i) => i !== 0).map(item => <Card key={item.id} {...item} />)}</div>
        </div>
      </div>
    </section>
  );
}
