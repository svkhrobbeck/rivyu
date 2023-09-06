// styles
// import "./Sidebar.scss";
// fc
import { FC } from "react";
// navlink
import { NavLink } from "react-router-dom";
// constant
import { sidebarLinks } from "@helpers/constants";
// store
import useUiStore from "@store/ui.store";

const SideBar: FC = (): JSX.Element => {
  const { sitenavMini, sitenav, setSitenav, setSitenavMini } = useUiStore();
  const hanleSidebarClose = (): void => setSitenav(false);

  return (
    <section className="sidebar">
      <nav
        className={`sidebar__nav ${!sitenavMini ? "sidebar__nav--mini" : ""} ${sitenav ? "sidebar__nav--show" : ""}`}
      >
        <button className="sidebar__toggler" onClick={() => setSitenavMini(!sitenavMini)}>
          <img
            className={`sidebar__toggler-img ${sitenavMini ? "sidebar__toggler-img--open" : ""}`}
            src="/images/icon-arrow-right.svg"
            alt="icon arrow right"
            width={24}
            height={24}
          />
        </button>
        <ul className="sidebar__list">
          {sidebarLinks &&
            sidebarLinks.map(link => (
              <li key={link.name} className={"sidebar__item"} onClick={hanleSidebarClose}>
                <NavLink className={`sidebar__link ${!sitenavMini && "sidebar__link--mini"}`} to={link.route}>
                  <img className="sidebar__link-icon" src={link.image} alt="icon" aria-hidden="true" />
                  <span className="sidebar__link-text">{link.name}</span>
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <div className={`sidebar__overlay ${sitenav ? "sidebar__overlay--show" : ""}`} onClick={hanleSidebarClose} />
    </section>
  );
};

export default SideBar;
