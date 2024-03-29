// styles
import "./Admin.scss";
// fc
import { FC } from "react";
// components
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Admin: FC = (): JSX.Element => {
  return (
    <section className="admin">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Admin</title>
      </Helmet>
      <div className="container">
        <div className="admin__btns-wrapper">
          <Link className="button button--green" to="/admin/create">
            Yangi Post
          </Link>
          <Link className="button button--green" to="/users">
            Foydalanuvchilar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
