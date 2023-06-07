import "./TagBadge.scss";

export default function TagBadge({ children, id, handleDeleteTags }) {
  return (
    <div className="tag-badge">
      <span className="tag-badge__inner">{children}</span>
      <button className="tag-badge__btn" onClick={() => handleDeleteTags(id)}>
        <img
          className="tag-badge__img"
          src="/images/icon-close.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
