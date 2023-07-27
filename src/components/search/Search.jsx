// style
import "./Search.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/search/${searchQuery.trim().toLowerCase()}`);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="main-field main-field--mini search__input"
          type="search"
          name="search"
          placeholder="Qidirish"
          aria-label="Search"
          autoComplete="off"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="search__button button button--green" type="submit">
          <img src="/images/icon-magnifier.svg" alt="icon magnifier" />
        </button>
      </form>
    </section>
  );
};

export default Search;
