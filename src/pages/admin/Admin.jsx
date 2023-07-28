// style
import "./Admin.scss";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="admin">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Admin</title>
      </Helmet>
      <div className="container">
        <div className="admin__btns-wrapper">
          <Link className="button button--green" to="/create">
            Yangi Post
          </Link>
          <Link className="button button--green" to="/admin/users">
            Foydalanuvchilar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
