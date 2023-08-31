// styles
import "./Tabs.scss";
// fc
import { FC } from "react";
// store
import usePostsStore from "@store/posts.store";
// constant
import { tabs } from "@helpers/constants";

const Tabs: FC = (): JSX.Element => {
  const { type, setType } = usePostsStore();

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          className={`tabs__item ${type === tab.type && "tabs__item--active"}`}
          key={tab.type}
          onClick={() => setType(tab.type)}
        >
          {tab.text}
        </div>
      ))}
      <div className="tabs__item"></div>
    </div>
  );
};

export default Tabs;
