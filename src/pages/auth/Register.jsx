import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";

export default function Register({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true);

  const signUpWithEmail = () => {
    if (email === "" || password === "") return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const currentUser = userCredential.user;
        localStorage.setItem("$#SA$UTH$", true);
        localStorage.setItem("$U$I$D$", currentUser?.uid);
        localStorage.setItem("$T$O$K$E$N$", currentUser?.accessToken);
        setIsAuth(true);
        navigate("/");
        return;
      })
      .catch(() => {
        setErr(true);
      });
  };

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
        <div className="form-login-register__field">
          <input
            className="form-login-resgister__input form-login-resgister__input--email"
            type="text"
            name="email"
            placeholder="Emailingizni kiriting"
            id="login-register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
        <button
          className="button button--green"
          type="button"
          onClick={signUpWithEmail}
        >
          Hisob yaratish
        </button>
        {err && (
          <p className="form-login-resgister__text form-login-resgister__text--error">
            Bunday hisob allaqachon yaratilgan
          </p>
        )}
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
