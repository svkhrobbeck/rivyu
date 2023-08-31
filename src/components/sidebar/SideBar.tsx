// styles
import "./SideBar.scss";
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
    <section className="side-bar">
      <nav className={`side-bar__nav ${!sitenavMini ? "side-bar__nav--mini" : ""} ${sitenav ? "side-bar__nav--show" : ""}`}>
        <button className="side-bar__toggler" onClick={() => setSitenavMini(!sitenavMini)}>
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
        </ul>
      </nav>
      <div className={`side-bar__overlay ${sitenav ? "side-bar__overlay--show" : ""}`} onClick={hanleSidebarClose} />
    </section>
  );
};

export default SideBar;
