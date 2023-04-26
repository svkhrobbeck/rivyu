import { useState } from "react";
import SideBar from "../components/side-bar/SideBar";
import Loader from "../components/loader/Loader";
import Router from "../router/Router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function MainLayout() {

  const [isLoader, setIsLoader] = useState(true);
  const [isSitenavOpen, setIsSitenavOpen] = useState(false);

  const handleSitenavToggle = () => {
    setIsSitenavOpen((prev) => !prev);
  };

  return (
    <>
      <Header handleSitenavToggle={handleSitenavToggle} />
      <main className="main-content">
        {isLoader && <Loader />}
        <SideBar
          isSitenavOpen={isSitenavOpen}
          handleSitenavToggle={handleSitenavToggle}
        />
        <Router loader={setIsLoader} />
      </main>
      <Footer />
    </>
  );
}
