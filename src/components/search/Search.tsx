// style
import "./Search.scss";

import { FormEvent, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import useUiStore from "../../store/ui.store";

const Search: FC = (): JSX.Element => {
  const { search, setSearch } = useUiStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query) return;
    navigate(`/search/${query.trim().toLowerCase()}`);
    setQuery("");
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className={`main-field main-field--mini search__input ${search ? "" : "search__input--close"}`}
          type="search"
          name="search"
          placeholder="Qidirish"
          aria-label="Search"
          autoComplete="off"
          value={query}
          onFocus={() => setSearch(true)}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          className={`button button--green search__button ${search ? "search__button--open" : ""}`}
          type="submit"
          onClick={() => setSearch(!search)}
          onBlur={() => setSearch(false)}
        >
          <img src="/images/icon-magnifier.svg" alt="icon magnifier" />
        </button>
      </form>
    </section>
  );
};

export default Search;
