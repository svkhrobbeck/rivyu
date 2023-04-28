import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Header({
  isSitenavOpen,
  isAuth,
  setIsAuth,
  handleSitenavToggle,
}) {
  const list = [
    {
      name: "Profil",
      icon: "/images/icon-mini-account.svg",
      route: "/profile",
    },
    {
      name: "Sozlamalar",
      icon: "/images/icon-settings.svg",
      route: "/settings",
    },
  ];

  const navigate = useNavigate();

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
              className="logo__img"
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
                src="/images/icon-account.svg"
                alt=""
              />
            </button>
            <ul className="user-account__list">
              {list &&
                list.map((item) => (
                  <li key={item.name} className="user-account__item">
                    <img
                      className="user-account__item-img"
                      src={item.icon}
                      alt={`${item.name} icon`}
                    />
                    <span className="user-account__item-inner">
                      {item.name}
                    </span>
                    {isAuth && <Link to={item.route} />}
                  </li>
                ))}
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
              {isAuth && (
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
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
