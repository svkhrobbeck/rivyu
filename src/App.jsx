import { useState } from "react";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainContent from "./components/main-content/MainContent";

function App() {
  const [isSitenavOpen, setIsSitenavOpen] = useState(false);

  const handleSitenavToggle = () => {
    setIsSitenavOpen((prev) => !prev);
  };

  return (
    <>
      <Header handleSitenavToggle={handleSitenavToggle} />
      <MainContent
        isSitenavOpen={isSitenavOpen}
        handleSitenavToggle={handleSitenavToggle}
      />
      <Footer />
    </>
  );
}

export default App;
