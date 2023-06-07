// style
import "./AdminDashboard.scss";

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <div className="container">
        <div className="admin-dashboard__btn-wrapper">
          <Link className="button button--green" to={"/admin/create-post"}>
            Yangi Post
          </Link>
        </div>
      </div>
    </section>
  );
}
