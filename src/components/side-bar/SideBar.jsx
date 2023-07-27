// style
import "./SideBar.scss";

import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import useUiStore from "../../store/ui.store";

const SideBar = () => {
  const { sitenavMini, sitenav, dispatch } = useUiStore();
  const hanleSidebarClose = () => dispatch({ type: "sitenav", payload: false });
  const hanleSidebarMiniToggle = () => dispatch({ type: "sitenav-mini-toggle" });

  return (
    <section className="side-bar">
      <nav className={`side-bar__nav ${!sitenavMini ? "side-bar__nav--mini" : ""} ${sitenav ? "side-bar__nav--show" : ""}`}>
        <button className="side-bar__toggler" onClick={hanleSidebarMiniToggle}>
          <img
            className={`side-bar__toggler-img ${sitenavMini ? "side-bar__toggler-img--open" : ""}`}
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
                <NavLink className={`side-bar__link ${!sitenavMini && "side-bar__link--mini"}`} to={link.route}>
                  <img className="side-bar__link-icon" src={link.image} alt="icon" aria-hidden="true" />
                  <span className="side-bar__link-text">{link.name}</span>
                </NavLink>
              </li>
            ))}
          <li className="side-bar__item" onClick={hanleSidebarClose}>
            <NavLink className={`side-bar__link ${!sitenavMini && "side-bar__link--mini"}`} to={"/admin"}>
              <img className="side-bar__link-icon" src="/images/icon-admin.svg" alt="icon" aria-hidden="true" />
              <span className="side-bar__link-text">Admin</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`side-bar__overlay ${sitenav ? "side-bar__overlay--show" : ""}`} onClick={hanleSidebarClose} />
    </section>
  );
};

export default SideBar;
