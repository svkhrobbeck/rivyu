import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addUser = async (state, role, email, password, uid, name, token) => {
  if (!state.users.admins.some(item => item.email.includes(email)) && !state.users.users.some(item => item.email.includes(email))) {
    const ref = doc(db, "users", "users");

    const user = {
      email,
      password,
      uid,
      name,
      token,
      image: null,
    };

    console.log(user);
    await updateDoc(ref, {
      users: [...state.users.users, user],
    });
  }
};
