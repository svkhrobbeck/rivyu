// style
import "./SideBar.scss";

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { sidebarLinks } from "../../constants";

export default function SideBar() {
  const { state, dispatch } = useContext(Context);
  const hanleSidebarClose = () => dispatch({ type: "SITENAV_TOGGLE" });
  const location = useLocation().pathname;

  return (
    <section className={`side-bar ${state.siteNavOpen ? "side-bar--show" : ""}`}>
      <nav className="side-bar__nav">
        <ul className="side-bar__list">
          <li className="side-bar__item">
            <Link to={"/"}>
              <button onClick={hanleSidebarClose} className={`side-bar__link ${location.includes("/") && location === "/" && "side-bar__link--active"}`}>
                <img className="side-bar__link-icon" src="/images/icon-home.svg" alt="icon" aria-hidden="true" />
                <span className="side-bar__link-text">Bosh Sahifa</span>
              </button>
            </Link>
          </li>
          {sidebarLinks &&
            sidebarLinks.map(link => (
              <li key={link.name} className={"side-bar__item"}>
                <Link to={link.route}>
                  <button onClick={hanleSidebarClose} className={`side-bar__link ${location.includes(link.route) && "side-bar__link--active"}`}>
                    <img className="side-bar__link-icon" src={link.image} alt="icon" aria-hidden="true" />
                    <span className="side-bar__link-text">{link.name}</span>
                  </button>
                </Link>
              </li>
            ))}
          {state.isAdmin && (
            <li className="side-bar__item">
              <Link to={"/admin"}>
                <button onClick={hanleSidebarClose} className={`side-bar__link ${location.includes("/admin") && "side-bar__link--active"}`}>
                  <img className="side-bar__link-icon" src="/images/icon-admin.svg" alt="icon" aria-hidden="true" />
                  <span className="side-bar__link-text">Admin</span>
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="side-bar__overlay" onClick={hanleSidebarClose} />
    </section>
  );
}
