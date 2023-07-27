// style
import "./Header.scss";

import { Link } from "react-router-dom";
import { Search } from "../";
import useUiStore from "../../store/ui.store";

const Header = () => {
  const { sitenav, dispatch } = useUiStore();

  return (
    <header className="site-header">
      <div className="site-header__container container">
        <div className="site-header__left">
          <button
            className={`sitenav-toggler ${sitenav ? "sitenav-toggler--show" : ""}`}
            onClick={() => dispatch({ type: "sitenav-toggle" })}
          >
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
          </button>
          <Link className="logo" to="/">
            <img className="logo__img" src="/images/logo.svg" alt="rivyu logo" width={175} height={45} />
          </Link>
        </div>
        <Search />
      </div>
    </header>
  );
};

export default Header;
