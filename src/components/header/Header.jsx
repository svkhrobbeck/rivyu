import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Header({
  isAdmin,
  isSitenavOpen,
  isAuth,
  setIsAuth,
  handleSitenavToggle,
}) {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const getUserImgUrl = () => {
    if (isAuth === false) return;
    const photoURL = user.photoURL;
    return photoURL;
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <button
            className={`sitenav-toggler ${
              isSitenavOpen && "sitenav-toggler--show"
            }`}
            onClick={handleSitenavToggle}
          >
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
          </button>
          <Link to={"/"}>
            <img
              className="logo"
              src="/images/logo.svg"
              alt="kino blog logo"
              width={45}
              height={45}
            />
          </Link>
        </div>
        <div className="site-header__actions">
          <div className="user-account">
            <button className="user-account__btn">
              <img
                className="user-account__img"
                src={getUserImgUrl() ? getUserImgUrl(): "/images/icon-account.svg"}
                alt=""
              />
            </button>
            <ul className="user-account__list">
              {isAuth && (
                <>
                  <li className="user-account__item">
                    <img
                      className="user-account__item-img"
                      src="/images/icon-settings.svg"
                      alt="settings icon"
                    />
                    <span className="user-account__item-inner">Sozlamalar</span>
                    {isAuth && <Link to={"/settings"} />}
                  </li>
                  <li className="user-account__item">
                    <img
                      className="user-account__item-img"
                      src="/images/icon-sign-out.svg"
                      alt=""
                    />
                    <button
                      className="user-account__item-btn"
                      onClick={signOutUser}
                    >
                      chiqish
                    </button>
                  </li>
                </>
              )}
              {!isAuth && (
                <li className="user-account__item">
                  <img
                    className="user-account__item-img"
                    src="/images/icon-login.svg"
                    alt=""
                  />
                  <span className="user-account__item-inner">kirish</span>
                  <Link to={"/login"} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
