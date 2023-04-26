import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.scss";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const signInWithEmail = () => {
    let currentUser = "";

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        currentUser = result.user;
        localStorage.setItem("$#SA$UTH$", true);
        localStorage.setItem("$U$I$D$", currentUser?.uid);
        localStorage.setItem("$T$O$K$E$N$", currentUser?.accessToken);
        setIsAuth(true);
        navigate("/");
      })
      .catch((err) => setErr(true));
  };

  return (
    <section className="login-register">
      <h2 className="login-register__title">Kirish</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithEmail();
        }}
        className="login-register__form form-login-resgister"
      >
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button button--green" type="submit">
          Kirish
        </button>
        {err && (
          <p className="form-login-resgister__text form-login-resgister__text--error">
            Email yoki Parol xato kiritilgan
          </p>
        )}
        <p className="form-login-resgister__text">
          <span className="form-login-resgister__text-inner">
            Ro'yxatdan o'tmagansizmi?
          </span>
          <Link to={"/register"}>
            <span className="form-login-resgister__text-link">
              Hisob yarating
            </span>
          </Link>
        </p>
        {/* <p className="form-login-resgister__text">Google orqali kirish</p>
        <button
          className="button form-login-register__google"
          type="button"
          onClick={signInWithGoogle}
        >
          <span>Google</span>
          <img src="/images/icon-google-plus.svg" alt="" />
        </button> */}
      </form>
    </section>
  );
}
