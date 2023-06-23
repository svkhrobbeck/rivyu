// style
import "./Header.scss";

import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      dispatch({ type: "SET_AUTH", payload: false });
      navigate("/login");
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <button className={`sitenav-toggler ${state.siteNavOpen && "sitenav-toggler--show"}`} onClick={() => dispatch({ type: "SITENAV_TOGGLE" })}>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
          </button>
          <Link to="/">
            <img className="logo" src="/images/logo.svg" alt="kino blog logo" width={45} height={45} />
          </Link>
        </div>
        <div className="site-header__actions">
          <button className="button user-account">
            <img className="user-account__img" src={state.currentUser?.image ? state.currentUser?.image : "/images/icon-account.svg"} alt="icon account" />
            <ul className="user-account__list">
              {state.isAuth && (
                <>
                  <li className="user-account__item item-account-user">
                    <img className="item-account-user__img" src="/images/icon-settings.svg" />
                    <Link className="item-account-user__link" to={"/settings"}>
                      Sozlamalar
                    </Link>
                  </li>
                  <li className="user-account__item item-account-user">
                    <img className="item-account-user__img" src="/images/icon-sign-out.svg" />
                    <span className="item-account-user__inner item-account-user__inner--red" onClick={signOutUser}>
                      Chiqish
                    </span>
                  </li>
                </>
              )}
              {!state.isAuth && (
                <li className="user-account__item item-account-user">
                  <img className="item-account-user__img" src="/images/icon-login.svg" />
                  <Link className="item-account-user__link" to={"/login"}>
                    kirish
                  </Link>
                </li>
              )}
            </ul>
          </button>
        </div>
      </div>
    </header>
  );
}
