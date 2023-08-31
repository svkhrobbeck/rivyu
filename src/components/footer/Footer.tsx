// styles
import "./Footer.scss";
// fc
import { FC } from "react";
// constants
import { links } from "@helpers/constants";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="site-footer">
      <div className="container site-footer__container">
        <p className="site-footer__copyright">© 2023 Rivyu. Barcha huquqlar himoyalangan!</p>
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
};

export default Footer;
