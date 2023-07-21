// style
import "./SideBar.scss";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { sidebarLinks } from "../../constants";

const SideBar = () => {
  const { state, dispatch } = useContext(Context);
  const hanleSidebarClose = () => dispatch({ type: "SITENAV_CLOSE" });
  const hanleSidebarMiniToggle = () => dispatch({ type: "SITENAV_MINI_TOGGLE" });

  return (
    <section className="side-bar">
      <nav className={`side-bar__nav ${!state.siteNavMini ? "side-bar__nav--mini" : ""} ${state.siteNavOpen ? "side-bar__nav--show" : ""}`}>
        <button className="side-bar__toggler" onClick={hanleSidebarMiniToggle}>
          <img
            className={`side-bar__toggler-img ${state.siteNavMini ? "side-bar__toggler-img--open" : ""}`}
            src="/images/icon-arrow-right.svg"
            alt="icon arrow right"
            width={24}
            height={24}
          />
        </button>
        <ul className="side-bar__list">
          {sidebarLinks &&
            sidebarLinks.map(link => (
              <li key={link.name} className={"side-bar__item"} onClick={hanleSidebarClose}>
                <NavLink className={`side-bar__link ${!state.siteNavMini && "side-bar__link--mini"}`} to={link.route}>
                  <img className="side-bar__link-icon" src={link.image} alt="icon" aria-hidden="true" />
                  <span className="side-bar__link-text">{link.name}</span>
                </NavLink>
              </li>
            ))}
          <li className="side-bar__item" onClick={hanleSidebarClose}>
            <NavLink className={`side-bar__link ${!state.siteNavMini && "side-bar__link--mini"}`} to={"/admin"}>
              <img className="side-bar__link-icon" src="/images/icon-admin.svg" alt="icon" aria-hidden="true" />
              <span className="side-bar__link-text">Admin</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`side-bar__overlay ${state.siteNavOpen ? "side-bar__overlay--show" : ""}`} onClick={hanleSidebarClose} />
    </section>
  );
};

export default SideBar;
