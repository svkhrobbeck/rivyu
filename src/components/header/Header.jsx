// style
import "./Header.scss";

import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { getLocalStorage, removeLocalStorage } from "../../utils/SetGetLocalStorage";
import { firebaseLink, imageKitLink } from "../../constants";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const usersRef = doc(db, "users", "users");

  const getUser = async () => {
    const data = (await getDoc(usersRef)).data();
    const users = [...data?.users, ...data?.admins];
    const user = users.find(item => item.uid === getLocalStorage("$U$I$D$"));
    dispatch({ type: "GET_USER", payload: user });
  };

  useEffect(() => {
    onSnapshot(usersRef, getUser);
  }, []);

  const signOutUser = () => {
    signOut(auth).then(() => {
      removeLocalStorage("$T$O$K$E$N$");
      removeLocalStorage("$U$I$D$");
      dispatch({ type: "SET_AUTH", payload: false });
      dispatch({ type: "SET_ADMIN", payload: false });
      navigate("/login");
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <button
            className={`sitenav-toggler ${state.siteNavOpen ? "sitenav-toggler--show" : ""}`}
            onClick={() => dispatch({ type: "SITENAV_TOGGLE" })}
          >
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
            <span className="sitenav-toggler__inner"></span>
          </button>
          <Link to="/">
            <img className="logo" src="/images/logo.svg" alt="kino blog logo" width={175} height={45} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
