import { Link } from "react-router-dom";
import "./SideBar.scss";

export default function SideBar({ isSitenavOpen, handleSitenavToggle }) {
  return (
    <section className={`side-bar ${isSitenavOpen ? "side-bar--show" : ""}`}>
      <ul className="side-bar__list">
        <li className="side-bar__item">
          <Link to={"/"}>
            <button
              onClick={handleSitenavToggle}
              className="side-bar__link side-bar__link--active"
            >
              <img
                className="side-bar__link-icon"
                src="/images/icon-home.svg"
                alt="icon"
                aria-hidden="true"
              />
              <span className="side-bar__link-text">Bosh Sahifa</span>
            </button>
          </Link>
        </li>
        <li className="side-bar__item">
          <Link to={"/reviews"}>
            <button onClick={handleSitenavToggle} className="side-bar__link">
              <img
                className="side-bar__link-icon"
                src="/images/icon-pencil.svg"
                alt="icon"
                aria-hidden="true"
              />
              <span className="side-bar__link-text">Tahlillar</span>
            </button>
          </Link>
        </li>
        <li className="side-bar__item">
          <Link to={"/news"}>
            <button onClick={handleSitenavToggle} className="side-bar__link">
              <img
                className="side-bar__link-icon"
                src="/images/icon-news.svg"
                alt="icon"
                aria-hidden="true"
              />
              <span className="side-bar__link-text">Yangiliklar</span>
            </button>
          </Link>
        </li>
        <li className="side-bar__item">
          <Link to={"/faq"}>
            <button onClick={handleSitenavToggle} className="side-bar__link">
              <img
                className="side-bar__link-icon"
                src="/images/icon-faq.svg"
                alt="icon"
                aria-hidden="true"
              />
              <span className="side-bar__link-text">FAQ</span>
            </button>
          </Link>
        </li>
      </ul>
    </section>
  );
}
