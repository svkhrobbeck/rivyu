// style
import { useNavigate } from "react-router-dom";
import "./Search.scss";
import { useState } from "react";

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = () => {
    if (!searchQuery) return;

    navigate(`/search/${searchQuery.trim().toLowerCase()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNavigate();
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="main-field search__input"
          type="search"
          name="search"
          placeholder="Qidirish"
          aria-label="Search"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <button
        className="search__button button button--green"
        onClick={handleNavigate}
      >
        <img src="/images/icon-magnifier.svg" alt="" />
      </button>
    </section>
  );
}
