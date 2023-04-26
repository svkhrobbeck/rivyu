import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5lLl2Ah18jjF2mohPBhk-HaYVQVwPh3g",
  authDomain: "kino-blog.firebaseapp.com",
  projectId: "kino-blog",
  storageBucket: "kino-blog.appspot.com",
  messagingSenderId: "119412215722",
  appId: "1:119412215722:web:16aa0dc0df485c64d025d3",
  measurementId: "G-6MT97BLPS0",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       localStorage.setItem("isAuth", true);
  //       setIsAuth(true);
  //       navigate("/");
  //     })
  //     .catch((err) => setErr(true));
  // };


// async function registerUser({ email, password }) {
//   await createUserWithEmailAndPassword(auth, email, password).then(
//     (userCredential) => {
//       const user = userCredential.user;
//       setUser(user);
//       setIsAuth(true);
//       localStorage.setItem("$U$I$D$", user?.uid);
//       localStorage.setItem("$ISAUTH$", "true");
//       localStorage.setItem("$T$O$K$E$N$", user?.accessToken);
//       addUserDb(email, password, user?.uid);
//     }
//   );
// }

// async function addUserDb(email, password, uid) {
//   try {
//     await addDoc(collection(db, "users"), {
//       email,
//       password,
//       liked: "",
//       id: v4(),
//       uid,
//     });
//   } catch {}
// }
