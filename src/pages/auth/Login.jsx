// style
import "./LoginRegister.scss";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { validateEmail, validatePassword } from "../../utils/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

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

    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const { accessToken, uid } = result.user;

        localStorage.setItem("$T$O$K$E$N$", accessToken);
        localStorage.setItem("$U$I$D$", uid);
        dispatch({ type: "SET_AUTH", payload: true });
        navigate("/");
      })
      .catch(() => setErr("Email yoki Parol xato kiritilgan"));
  };

  return (
    <section className="login-register">
      <h2 className="login-register__title">Kirish</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          signInWithEmail();
        }}
        className="login-register__form form-login-resgister"
      >
        <label className="form-login-resgister__label" htmlFor="login-register-email">
          Emailingiz
        </label>
        <div className="form-login-register__field">
          <input
            className="form-login-resgister__input form-login-resgister__input--email"
            type="text"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder="Emailingizni kiriting"
            id="login-register-email"
            value={email}
            onChange={e => validateEmail(e, setErr, setEmail)}
          />
        </div>
        <label className="form-login-resgister__label" htmlFor="login-register-password">
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
            onChange={e => validatePassword(e, setErr, setPassword)}
          />
          <button className="form-login-register__password-toggle" type="button" onClick={() => setIsPassword(prev => !prev)}>
            <img className="form-login-register__password-toggle-img" src={isPassword ? "/images/icon-eye.svg" : "/images/icon-eye-slash.svg"} alt="eye icon" />
          </button>
        </div>
        <button className="button button--green" type="submit">
          Kirish
        </button>
        {err && <p className="form-login-resgister__text form-login-resgister__text--error">{err}</p>}
        <p className="form-login-resgister__text">
          <span className="form-login-resgister__text-inner">Ro'yxatdan o'tmagansizmi?</span>
          <Link to={"/register"}>
            <span className="form-login-resgister__text-link">Hisob yarating</span>
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
