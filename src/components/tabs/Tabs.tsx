// styles
import "./Tabs.scss";
// fc
import { FC } from "react";
// store
import usePostsStore from "@store/posts.store";
// constant
import { tabs } from "@helpers/constants";

const Tabs: FC = (): JSX.Element => {
  const { category, setCategory } = usePostsStore();

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          className={`tabs__item ${category === tab.category && "tabs__item--active"}`}
          key={tab.category}
          onClick={() => setCategory(tab.category)}
        >
          {tab.text}
        </div>
      ))}
      <div className="tabs__item"></div>
    </div>
  );
};

export default Tabs;
