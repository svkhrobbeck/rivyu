import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import "./LoginRegister.scss";

export default function Register() {
  return (
    <section className="login-register">
      <h2 className="login-register__title">Ro'yxatdan o'tish</h2>
      <form className="login-register__form form-login-resgister">
        <label
          className="form-login-resgister__label"
          htmlFor="login-register-email"
        >
          Emailingiz
        </label>
        <input
          className="form-login-resgister__input"
          type="text"
          name="email"
          placeholder="Emailingizni kiriting"
          id="login-register-email"
        />

        <label
          className="form-login-resgister__label"
          htmlFor="login-register-password"
        >
          Parolingiz
        </label>
        <input
          className="form-login-resgister__input"
          type="text"
          name="password"
          placeholder="Parolingizni kiriting"
          id="login-register-password"
        />
        <Button type="button">Hisob yaratish</Button>
        <p className="form-login-resgister__text">
          <span className="form-login-resgister__text-inner">
            Ro'yxatdan o'tgansizmi?
          </span>
          <Link to={"/login"}>
            <span className="form-login-resgister__text-link">
              Hisobingizga kiring
            </span>
          </Link>
        </p>
      </form>
    </section>
  );
}