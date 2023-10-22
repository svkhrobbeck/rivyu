// styles
import "./Admin.scss";
// components
import { Helmet } from "react-helmet";
// fc
import { FC, useState } from "react";

const Users: FC = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState("user");
  const [users, setUsers] = useState([]);

  const createNewUser = async () => {};
  const getUsers = async () => {};

  return (
    <section className="admin-users">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Foydalanuvchilar</title>
      </Helmet>
      <div className="container admin-users__inner">
        <h2 className="admin-users__title main-title">Foydalanuvchilar ro'yxati</h2>
        <div className="admin-users__table-wrapper">
          <table className="admin-users__table">
            <thead>
              <tr className="admin-users__table-row">
                <th className="admin-users__table-heading">Foydalanuvchi nomi</th>
                <th className="admin-users__table-heading">Email</th>
                <th className="admin-users__table-heading">Rol</th>
              </tr>
            </thead>
            <tbody>
              {!!users.length &&
                users.map(({ email, name, _id, role }) => (
                  <tr className="admin-users__table-row" key={_id}>
                    <td className="admin-users__table-desc">{name}</td>
                    <td className="admin-users__table-desc">{email}</td>
                    <td className="admin-users__table-desc">{role}</td>
                  </tr>
                ))}
              <tr className="admin-users__table-row">
                <td className="admin-users__table-desc">
                  <input
                    className="admin-users__table-field"
                    type="text"
                    placeholder="Foydalanuvchi nomi"
                    value={username}
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                  />
                </td>
                <td className="admin-users__table-desc">
                  <div className="admin-users__table-fields">
                    <input
                      className="admin-users__table-field"
                      type="text"
                      placeholder="email"
                      value={email}
                      name="email"
                      onChange={e => setEmail(e.target.value)}
                    />
                    <input
                      className="admin-users__table-field"
                      type="text"
                      name="password"
                      placeholder="parol"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </td>
                <td className="admin-users__table-desc">
                  <div className="admin-users__table-fields">
                    <select
                      className="admin-users__table-select"
                      defaultValue={role}
                      onChange={e => setRole(e.target.value)}
                    >
                      <option value="admin">foydalanuvchi</option>
                      <option value="user">admin</option>
                    </select>
                    <button className="admin-users__table-add button" onClick={createNewUser}>
                      qo'shish
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Users;
