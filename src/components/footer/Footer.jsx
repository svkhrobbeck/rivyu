// style
import "./Footer.scss";

import { links } from "../../constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__container">
        <p className="site-footer__copyright">© 2023 Kino Blog. Barcha huquqlar himoyalangan!</p>
        <div className="site-footer__actions">
          {!!links.length &&
            links.map(({ link, imgPath, alt }) => (
              <a className="site-footer__link" target="_blank" href={link} key={alt}>
                <img className="site-footer__img" src={imgPath} alt={alt} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
