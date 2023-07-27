// layout
import Layout from "./layout/Layout";

import usePostsStore from "./store/posts.store";
import useUiStore from "./store/ui.store";

const App = () => {
  const { isLoading } = usePostsStore();
  const { sitenavMini } = useUiStore();
  return (
    <div className={`app ${sitenavMini ? "app--open" : ""}`}>
      {/* {isLoading && <Loader />} */}
      <Layout />
    </div>
  );
};

export default App;
