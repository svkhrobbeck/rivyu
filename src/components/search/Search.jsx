// style
import { useNavigate } from "react-router-dom";
import "./Search.scss";
import { useState } from "react";

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = () => {
    navigate(`/search/${searchQuery.trim().toLowerCase()}`);
  };

  return (
    <section className="search">
      <input
        className="main-field search__input"
        type="search"
        name="search"
        placeholder="Qidirish"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="search__button button button--green"
        onClick={handleNavigate}
      >
        <img src="/images/icon-magnifier.svg" alt="" />
      </button>
    </section>
  );
}
