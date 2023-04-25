import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./404.scss";

export default function Page404() {
  return (
    <section className="page-404 container">
      <img className="page-404__img" src="/images/404.svg" alt="" />
      <div className="page-404__content">
        <h2 className="page-404__title">Sahifa topilmadi</h2>
        <p className="page-404__desc">
          "Uzr! Siz yaroqsiz sahifaga tashrif buyurgan ko'rinasiz. Agarda bu
          bizning xatoyimiz ekanligiga ishonchingiz komil bo'lsa, bizga xabar
          bering."
        </p>
        <Link to={"/"}>
          <Button>Bosh sahifaga qaytish</Button>
        </Link>
      </div>
    </section>
  );
}
