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
      <Header exact handleSitenavToggle={handleSitenavToggle} />
      <MainContent
        exact
        isSitenavOpen={isSitenavOpen}
        handleSitenavToggle={handleSitenavToggle}
      />
      <Footer exact />
    </>
  );
}

export default App;
