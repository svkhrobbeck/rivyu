// style
import "./Users.scss";

import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { addUser } from "../../utils/addUser";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateEmailAndPassword, validatePassword } from "../../utils/validateEmailPassword";
import { removeLocalStorage } from "../../utils/SetGetLocalStorage";

const Users = () => {
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("users");

  const createNewUser = () => {
    validateEmailAndPassword(email, password, setErr);

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        let { accessToken, uid, displayName } = userCredential.user;
        displayName = username;

        addUser(state, role, email, password, uid, username, accessToken);
        removeLocalStorage("$T$O$K$E$N$");
        removeLocalStorage("$U$I$D$");
        dispatch({ type: "SET_AUTH", payload: false });
        dispatch({ type: "SET_ADMIN", payload: false });
        navigate("/login");
        return;
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <section className="users">
      <div className="container users__inner">
        <h2 className="users__title main-title">Foydalanuvchilar ro'yxati</h2>
        <table className="users__table">
          <thead>
            <tr className="users__table-row">
              <th className="users__table-heading">Foydalanuvchi nomi</th>
              <th className="users__table-heading">Email</th>
              <th className="users__table-heading">Rol</th>
            </tr>
          </thead>
          <tbody>
            {!![...Object.keys(state.users)]?.length &&
              [...state.users.admins, ...state.users.users].map(({ email, name, uid, isAdmin }) => (
                <tr className="users__table-row" key={uid}>
                  <td className="users__table-desc">{name}</td>
                  <td className="users__table-desc">{email}</td>
                  <td className="users__table-desc">{isAdmin ? "Admin" : "Foydalanuvchi"}</td>
                </tr>
              ))}
            <tr className="users__table-row">
              <td className="users__table-desc">
                <input
                  className="users__table-field"
                  type="text"
                  placeholder="Foydalanuvchi nomi"
                  value={username}
                  name="username"
                  onChange={e => setUsername(e.target.value)}
                />
              </td>
              <td className="users__table-desc">
                <div className="users__table-fields">
                  <input
                    className="users__table-field"
                    type="text"
                    placeholder="email"
                    value={email}
                    name="email"
                    onChange={e => validateEmail(e, setErr, setEmail)}
                  />
                  <input
                    className="users__table-field"
                    type="text"
                    name="password"
                    placeholder="parol"
                    value={password}
                    onChange={e => validatePassword(e, setErr, setPassword)}
                  />
                </div>
              </td>
              <td className="users__table-desc">
                <div className="users__table-fields">
                  <select className="users__table-select" defaultValue={role} onChange={e => setRole(e.target.value)}>
                    <option value="users">foydalanuvchi</option>
                    <option value="admins">admin</option>
                  </select>
                  <button className="users__table-add button" onClick={createNewUser}>
                    qo'shish
                  </button>
                </div>
              </td>
            </tr>
            {!!err.trim().length && (
              <tr className="users__table-row">
                <td className="users__table-desc users__table-desc--error" colSpan={3}>
                  {err}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
