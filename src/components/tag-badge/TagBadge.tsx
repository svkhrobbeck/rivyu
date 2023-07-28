// style
import "./TagBadge.scss";

import { ReactNode, FC } from "react";

interface ITagBadge {
  children: ReactNode;
  id: string;
  handleDeleteTags: (id: string) => void;
}

const TagBadge: FC<ITagBadge> = ({ children, id, handleDeleteTags }): JSX.Element => {
  return (
    <div className="tag-badge">
      <span className="tag-badge__inner">{children}</span>
      <button className="tag-badge__btn" onClick={() => handleDeleteTags(id)}>
        <img className="tag-badge__img" src="/images/icon-close.svg" alt="icon close" aria-hidden="true" />
      </button>
    </div>
  );
};

export default TagBadge;
