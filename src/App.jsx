// layout
import Layout from "./layout/Layout";


  return (
    <div className={`app ${state.siteNavMini ? "app--open" : ""}`}>
      <Layout />
    </div>
  );
};

export default App;
