// styles
import "./Tabs.scss";
// fc
import { FC, useState } from "react";
// constant
import { tabs } from "@helpers/constants";
import { useSearchParams } from "react-router-dom";
import useParams from "@helpers/useParams";

const Tabs: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "reviews");

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <div
          className={`tabs__item ${selectedCategory === tab.category && "tabs__item--active"}`}
          key={tab.category}
          onClick={() => {
            setSearchParams(useParams(searchParams, "category", tab.category));
            setSelectedCategory(tab.category);
          }}
        >
          {tab.text}
        </div>
      ))}
      <div className="tabs__item"></div>
    </div>
  );
};

export default Tabs;
