import { useEffect, useState } from "react";
import SideBar from "../components/side-bar/SideBar";
import Loader from "../components/loader/Loader";
import Router from "../router/Router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function MainLayout() {
  const [isLoader, setIsLoader] = useState(true);
  const [isSitenavOpen, setIsSitenavOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const getAdminData = (db, collectionType, uid) => {
    const newsCollectionRef = collection(db, collectionType);
    const getArr = async () => {
      const data = await getDocs(newsCollectionRef);
      const newData = data.docs.map((doc) => ({ ...doc.data() }));

      newData.forEach((item) => {
        if (
          localStorage.getItem("$U$I$D$") === item.adminToken &&
          item.adminToken === uid
        ) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
      getArr();
    };
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
        }
        getAdminData(db, "admin", uid);
      }
    });
  }, [isAuth]);

  const handleSitenavToggle = () => {
    setIsSitenavOpen((prev) => !prev);
  };

  return (
    <>
      <Header
        isAdmin={isAdmin}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        handleSitenavToggle={handleSitenavToggle}
      />
      <main className="main-content">
        {isLoader && <Loader />}
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
          loader={setIsLoader}
        />
      </main>
      <Footer />
    </>
  );
}
