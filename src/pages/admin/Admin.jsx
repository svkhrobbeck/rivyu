// style
import "./Admin.scss";

import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="admin">
      <div className="container">
        <div className="admin__btns-wrapper">
          <Link className="button button--green" to="/admin/create">
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
