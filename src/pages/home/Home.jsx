// style
import "./Home.scss";

// components
import { Search, MiniSideBar, FavoritePost } from "../../components";

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
          <section className="hero">
            <div className="hero__content">
              <h2 className="hero__title">
                <q>Kino Blog</q> - Kino Tahlillar va Yangiliklar
              </h2>
              <p className="hero__desc">
                Kino yangiliklarga oid va turli qiziqarli tahlillarga boy platformamizga xush kelibsiz. Bizda turli janrdagi kino va seriallar haqida bilib
                olishingiz mumkin.
              </p>
            </div>
          </section>
          <FavoritePost />
        </div>
        <div className="home__side-bar">
          <MiniSideBar arr={state?.arr?.slice(1, 8)} title="So'nggi yangiliklar" state="news" />
        </div>
      </div>
    </section>
  );
}
