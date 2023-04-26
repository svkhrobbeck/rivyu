import { useEffect, useState } from "react";
import SideBar from "../components/side-bar/SideBar";
import Loader from "../components/loader/Loader";
import Router from "../router/Router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function MainLayout() {
  const [isLoader, setIsLoader] = useState(true);
  const [isSitenavOpen, setIsSitenavOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("$#SA$UTH$")) || false
  );

  const getAdminData = (db, collectionType) => {
    const newsCollectionRef = collection(db, collectionType);
    setIsLoader(true);
    const getArr = async () => {
      const dataBack = await getDocs(newsCollectionRef);
      const newData = dataBack.docs.map((doc) => ({ ...doc.data() }));

      newData.forEach((item) => {
        if (localStorage.getItem("$U$I$D$") === item.adminToken) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
      setIsLoader(false);
    };

    getArr();
  };

  useEffect(() => {
    getAdminData(db, "admin");
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
