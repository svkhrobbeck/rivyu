// fc
import { FC } from "react";
// store
import useUiStore from "@store/ui.store";
// layout
import Layout from "@layout/Layout";

const App: FC = (): JSX.Element => {
  const { sitenavMini } = useUiStore();
  return (
    <div className={`app ${sitenavMini ? "app--open" : ""}`}>
      <Layout />
    </div>
  );
};

export default App;
