import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { validateEmail, validatePassword } from "../../utils/utils";
import { doc, updateDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true);
  const { state, dispatch } = useContext(Context);

  const addUser = async (email, password, uid, name, token) => {
    if (
      !state.users.admins.some((item) => item.email.includes(email)) &&
      !state.users.users.some((item) => item.email.includes(email))
    ) {
      const ref = doc(db, "users", "users");

      const user = {
        email,
        password,
        uid,
        name,
        token,
        image: null,
      };
      console.log(user);
      await updateDoc(ref, {
        users: [...state.users.users, user],
      });
    }
  };

  const signUpWithEmail = () => {
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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const currentUser = userCredential.user;
        currentUser.displayName = email.split("@")[0];
        localStorage.setItem("$#SA$UTH$", true);
        localStorage.setItem("$U$I$D$", currentUser?.uid);
        localStorage.setItem("$T$O$K$E$N$", currentUser?.accessToken);
        dispatch({ type: "SET_AUTH", payload: true });
        dispatch({ type: "IS_UPDATED" });
        addUser(
          email,
          password,
          currentUser?.uid,
          currentUser.displayName,
          currentUser?.accessToken
        );
        navigate("/");
        return;
      })
      .catch(() => {
        setErr("Bunday hisob allaqachon yaratilgan");
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
            onChange={(e) => validateEmail(e, setErr, setEmail)}
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
            onChange={(e) => validatePassword(e, setErr, setPassword)}
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
            {err}
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
