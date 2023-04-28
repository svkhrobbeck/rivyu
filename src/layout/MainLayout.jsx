import { useEffect, useState } from "react";
import SideBar from "../components/side-bar/SideBar";
import Router from "../router/Router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function MainLayout() {
  const [isSitenavOpen, setIsSitenavOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const getAdminData = async (db, collectionType) => {
    const newsCollectionRef = collection(db, collectionType);
    const dataBack = await getDocs(newsCollectionRef);
    const newData = dataBack.docs.map((doc) => ({ ...doc.data() }));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        newData.forEach((item) => {
          if (
            isAuth &&
            localStorage.getItem("$U$I$D$") === item.adminToken &&
            localStorage.getItem("$U$I$D$") === uid
          ) {
            setIsAdmin(true);
          }
        });
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const token = user.accessToken;
        if (
          uid === localStorage.getItem("$U$I$D$") &&
          localStorage.getItem("$T$O$K$E$N$") === token
        ) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
        setIsAdmin(false);
        console.log("user signed out");
      }
    });
    getAdminData(db, "admin");
  }, [isAuth]);

  const handleSitenavToggle = () => {
    setIsSitenavOpen((prev) => !prev);
  };

  return (
    <>
      <Header
        isAdmin={isAdmin}
        isSitenavOpen={isSitenavOpen}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        handleSitenavToggle={handleSitenavToggle}
      />
      <main className="main-content">
        <SideBar
          isAdmin={isAdmin}
          isAuth={isAuth}
          isSitenavOpen={isSitenavOpen}
          handleSitenavToggle={handleSitenavToggle}
        />
        <Router
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
      </main>
      <Footer />
    </>
  );
}
