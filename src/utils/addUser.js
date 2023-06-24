import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addUser = async (state, role, email, password, uid, name, token) => {
  if (state.users[role].some(item => item.email?.includes(email))) return;
  const ref = doc(db, "users", "users");
  const users = (await getDoc(ref)).data();

  const isAdmin = role === "admins";

  const user = {
    email,
    password,
    uid,
    name,
    token,
    isAdmin,
    role: isAdmin ? "admin" : "user",
    image: null,
  };

  updateDoc(ref, { [role]: [...users[role].filter(item => item.uid !== user.uid), user] });
};
