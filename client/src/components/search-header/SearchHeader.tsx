import React from "react";
import "./SearchHeader.scss";
import SearchIcon from "../../icons/search-icon";

const SearchHeader = (props: string) => {
  const { search } = props;

  return (
    <section>
      <div className="hero-container">
        <h1 className="hero-text">Emménagez en 1, 2, 3 !</h1>
        <p className="hero-subtext">
          Tout l'immobilier en Tunisie en vente ou location!
        </p>
        <div className="hero-search-container">
          <input
            className="hero-search-input"
            type="text"
            placeholder="Rechercher un bien"
          />
          <button
            className="hero-search-button"
            onClick={() => console.log("search")}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchHeader;
