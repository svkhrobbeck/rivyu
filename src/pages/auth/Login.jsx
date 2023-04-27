import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.scss";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const validatePassword = (e) => {
    const val = e.target.value.toLowerCase();

    setPassword(val);
    if (val.length === 0) {
      setErr("Parolingizni kiriting");
    } else if (val.length >= 8) {
      setErr("");
    } else if (val.length < 8) {
      setErr("Parol kamida 8 ta belgidan iborat bo'lishi kerak");
    }
  };

  const validateEmail = (e) => {
    const val = e.target.value.toLowerCase();

    setEmail(val);

    if (val.length === 0) {
      setErr("Emailingizni kiriting");
    } else if (val.length > 0) {
      setErr("");
    }
  };

  const signInWithEmail = () => {
    if (email === "" && password === "") {
      setErr("Email va parolni kiriting!");
      return;
    } else if (email === "") {
      setErr("Emailni kiriting!");
      return;
    } else if (password === "") {
      setErr("Parolni kiriting!");
      return;
    }
    let currentUser = "";

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        currentUser = result.user;
        currentUser.displayName = email.split("@")[0];
        localStorage.setItem("$#SA$UTH$", true);
        localStorage.setItem("$U$I$D$", currentUser?.uid);
        localStorage.setItem("$T$O$K$E$N$", currentUser?.accessToken);
        setIsAuth(true);
        navigate("/");
      })
      .catch((err) => setErr("Email yoki Parol xato kiritilgan"));
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
        <div className="form-login-register__field">
          <input
            className="form-login-resgister__input form-login-resgister__input--email"
            type="text"
            name="email"
            placeholder="Emailingizni kiriting"
            id="login-register-email"
            value={email}
            onChange={validateEmail}
          />
        </div>
        <label
          className="form-login-resgister__label"
          htmlFor="login-register-password"
        >
          Parolingiz
        </label>
        <div className="form-login-register__field">
          <input
            className="form-login-resgister__input form-login-resgister__input--password"
            type={isPassword ? "password" : "text"}
            name="password"
            placeholder="Parolingizni kiriting"
            id="login-register-password"
            value={password}
            onChange={validatePassword}
          />
          <button
            className="form-login-register__password-toggle"
            type="button"
            onClick={() => setIsPassword((prev) => !prev)}
          >
            <img
              className="form-login-register__password-toggle-img"
              src={
                isPassword
                  ? "/images/icon-eye.svg"
                  : "/images/icon-eye-slash.svg"
              }
              alt="eye icon"
            />
          </button>
        </div>
        <button className="button button--green" type="submit">
          Kirish
        </button>
        {err && (
          <p className="form-login-resgister__text form-login-resgister__text--error">
            {err}
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
      </form>
    </section>
  );
}
