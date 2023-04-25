import "./Header.scss";
import SitenavToggler from "../sitenav-toggler/SitenavToggler";
import ThemeToggler from "../theme-toggler/ThemeToggler";
import { Link } from "react-router-dom";

export default function Header({ handleSitenavToggle }) {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <SitenavToggler handleSitenavToggle={handleSitenavToggle} />

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
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
