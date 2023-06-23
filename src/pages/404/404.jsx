// style
import "./404.scss";

import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="page-404 container">
      <img className="page-404__img" src="/images/404.svg" alt="" />
      <div className="page-404__content">
        <h2 className="page-404__title">Sahifa topilmadi</h2>
        <p className="page-404__desc">
          "Uzr! Siz yaroqsiz sahifaga tashrif buyurgan ko'rinasiz. Agarda bu bizning xatoyimiz ekanligiga ishonchingiz komil bo'lsa, bizga xabar bering."
        </p>
        <Link to={"/"}>
          <button className="button button--green">Bosh sahifaga qaytish</button>
        </Link>
      </div>
    </section>
  );
};

export default Page404;
