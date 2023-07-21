// layout
import { useContext } from "react";
import Layout from "./layout/Layout";
import { Context } from "./context/Context";

const App = () => {
  const { state } = useContext(Context);

  return (
    <div className={`app ${state.siteNavMini ? "app--open" : ""}`}>
      <Layout />
    </div>
  );
};

export default App;
