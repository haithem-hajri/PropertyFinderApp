import React, { useState } from "react";
import "./Hero.scss";
import SearchIcon from "../../icons/search-icon";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<any>("");

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="hero-search-button"
            onClick={() => navigate("/search", { state: search })}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
