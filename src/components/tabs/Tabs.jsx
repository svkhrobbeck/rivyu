// style
import "./Tabs.scss";

import usePostsStore from "../../store/posts.store";

const Tabs = () => {
  const { type, setType } = usePostsStore();
  const tabs = [
    { text: "Maqolalar", type: "reviews" },
    { text: "Yangiliklar", type: "news" },
    { text: "Treylerlar", type: "trailers" },
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div className={`tabs__item ${type === tab.type && "tabs__item--active"}`} key={tab.type} onClick={() => setType(tab.type)}>
          {tab.text}
        </div>
      ))}
      <div className="tabs__item"></div>
    </div>
  );
};

export default Tabs;
