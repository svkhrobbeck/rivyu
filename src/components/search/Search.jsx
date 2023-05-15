// style
import "./Search.scss";

export default function Search() {
  return (
    <section className="search">
      <input
        className="main-field search__input"
        type="search"
        name="search"
        placeholder="Qidirish"
        aria-label="Search"
      />
      <button className="search__button button button--green">
        <img src="/images/icon-magnifier.svg" alt="" />
      </button>
    </section>
  );
}
