import MiniSideBar from "../../components/mini-sidebar/MiniSideBar";
import "./Home.scss";

export default function Home({ news, reviews }) {
  document.title = `Kino Blog | Bosh sahifa`;
  return (
    <section className="home">
      <div className="container">
        <div className="home__inner">
          <div className="home__content">
            <section className="hero">
              <div className="hero__inner">
                <div className="hero__content">
                  <h2 className="hero__title">
                    <span className="hero__title-inner">Kino Blog</span>- Kino
                    Tahlillar va Yangiliklar
                  </h2>
                  <p className="hero__desc">
                    Kino yangiliklarga oid va turli qiziqarli tahlillarga boy
                    platformamizga xush kelibsiz. Bizda turli janrdagi kino va
                    seriallar haqida bilib olishingiz mumkin.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="home__side-bar">
            <MiniSideBar
              arr={news.slice(0, 3)}
              title="So'nggi yangiliklar"
              state="news"
            />
            <MiniSideBar
              arr={reviews.slice(0, 3)}
              title="So'nggi tahlillar"
              state="reviews"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
