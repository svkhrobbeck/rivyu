// style
import "./Search.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUiStore from "../../store/ui.store";

const Search = () => {
  const { search, dispatch } = useUiStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!query) return;
    navigate(`/search/${query.trim().toLowerCase()}`);
    setQuery("");
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className={`search__input-wrapper ${search ? "" : "search__input-wrapper--close"}`}>
          <input
            className="main-field main-field--mini search__input"
            type="search"
            name="search"
            placeholder="Qidirish"
            aria-label="Search"
            autoComplete="off"
            value={query}
            onFocus={() => dispatch({ type: "search", payload: false })}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button
          className={`button button--green search__button ${search ? "search__button--open" : ""}`}
          type="submit"
          onClick={() => dispatch({ type: "search", payload: !search })}
          onBlur={() => dispatch({ type: "search", payload: false })}
        >
          <img src="/images/icon-magnifier.svg" alt="icon magnifier" />
        </button>
      </form>
    </section>
  );
};

export default Search;
