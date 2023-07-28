// style
import "./Header.scss";

import { FC } from "react";
import { Link } from "react-router-dom";
import { Search } from "..";
import useUiStore from "../../store/ui.store";

const Header: FC = (): JSX.Element => {
  const { sitenav, search, setSitenav } = useUiStore();
  let isLogo: boolean = window.innerWidth <= 840 && search;

  return (
    <header className="site-header">
      <div className="site-header__container container">
        <div className="site-header__left">
          <button className={`sitenav-toggler ${sitenav ? "sitenav-toggler--show" : ""}`} onClick={() => setSitenav(!sitenav)}>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
          </button>
          {!isLogo && (
            <Link className="logo" to="/">
              <img className="logo__img" src="/images/logo.svg" alt="rivyu logo" width={120} height={45} />
            </Link>
          )}
        </div>
        <Search />
      </div>
    </header>
  );
};

export default Header;
