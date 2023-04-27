import "./AdminDashboard.scss";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <div className="container">
        <div className="admin-dashboard__btn-wrapper">
          <Link to={"/admin/create-post"}>
            <button className="button button--green">Yangi Post</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
