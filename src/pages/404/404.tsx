// style
import { FC } from "react";
import "./404.scss";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Page404: FC = (): JSX.Element => {
  return (
    <section className="page-404 container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Sahifa topilmadi</title>
      </Helmet>
      <img className="page-404__img" src="/images/404.svg" alt="page not found" />
      <div className="page-404__content">
        <h2 className="page-404__title">Sahifa topilmadi</h2>
        <p className="page-404__desc">
          "Uzr! Siz yaroqsiz sahifaga tashrif buyurgan ko'rinasiz. Agarda bu bizning xatoyimiz ekanligiga ishonchingiz komil bo'lsa, bizga
          xabar bering."
        </p>
        <Link className="button button--green" to="/">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </section>
  );
};

export default Page404;
