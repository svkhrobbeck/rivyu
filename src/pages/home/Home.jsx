import "./Home.scss";
import MiniSideBar from "../../components/mini-sidebar/MiniSideBar";
import { Link } from "react-router-dom";

export default function Home({ news, reviews }) {
  document.title = `Kino Blog | Bosh sahifa`;
  const postData = news[0] || null;

  return (
    <section className="home">
      <div className="container home__inner">
        <div className="home__content">
          <section className="hero">
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
          </section>

          <section className="favorite-post">
            {postData && (
              <img
                className="favorite-post__img"
                src={postData.image}
                alt={postData.title}
                width="640"
                height="270"
                title={postData.title}
              />
            )}
            <h4 className="favorite-post__title">
              Eng so'ngi yangilik{" "}
              {!postData && <img src="/images/rolling-spinner.svg" />}
            </h4>
            {postData && (
              <h5 className="favorite-post__subtitle" title={postData.title}>
                {postData.title}
              </h5>
            )}
            <Link to={postData ? `/news/${postData.id}` : "/"}>
              <button className="button button--green">
                {postData ? "Batafsil" : "Yuklanmoqda..."}
              </button>
            </Link>
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
    </section>
  );
}
