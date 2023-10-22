// fc
import { FC } from "react";
// components
import Router from "@router/Router";
import { Footer, Header, Sidebar } from "@components/index";

const Layout: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Sidebar />
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
