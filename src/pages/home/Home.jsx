// style
import "./Home.scss";

// components
import { Search, MiniSideBar, FavoritePost, Card } from "../../components";

import { Helmet } from "react-helmet";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Kino Yangiliklari</title>
      </Helmet>
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
          {
            !!state.arr
              .filter((_, i) => i !== 0)
              ?.length ? state.arr.filter((_, i) => i !== 0)
              .map(item => <Card key={item.id} {...item} />)
              : <>Maqolalar topilmadi</>
          }
        </div>
      </div>
    </section>
  );
};

export default Home;
