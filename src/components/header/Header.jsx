import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header({ handleSitenavToggle }) {
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
    { name: "Chiqish", icon: "/images/icon-sign-out.svg", route: "" },
  ];
  
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <button className="sitenav-toggler" onClick={handleSitenavToggle}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              fontSize="25px"
              cursor="pointer"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" />
              </g>
            </svg>
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
                    <Link to={item.route} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
