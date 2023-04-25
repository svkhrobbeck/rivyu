import { Link, useLocation } from "react-router-dom";
import "./SideBar.scss";
import { useState } from "react";

export default function SideBar({ isSitenavOpen, handleSitenavToggle }) {
  const links = [
    { name: "Bosh Sahifa", route: "/", image: "/images/icon-home.svg" },
    { name: "Tahlillar", route: "/reviews", image: "/images/icon-pencil.svg" },
    { name: "Yangiliklar", route: "/news", image: "/images/icon-news.svg" },
    { name: "Admin", route: "/admin", image: "/images/icon-admin.svg" },
    { name: "FAQ", route: "/faq", image: "/images/icon-faq.svg" },
  ];

  const location = useLocation().pathname;
  return (
    <section className={`side-bar ${isSitenavOpen ? "side-bar--show" : ""}`}>
      <nav>
        <ul className="side-bar__list">
          {links &&
            links.map((link) => (
              <li key={link.name} className={"side-bar__item"}>
                <Link to={link.route}>
                  <button
                    onClick={handleSitenavToggle}
                    className={`side-bar__link ${
                      link.route === location && "side-bar__link--active"
                    }`}
                  >
                    <img
                      className="side-bar__link-icon"
                      src={link.image}
                      alt="icon"
                      aria-hidden="true"
                    />
                    <span className="side-bar__link-text">{link.name}</span>
                  </button>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </section>
  );
}
