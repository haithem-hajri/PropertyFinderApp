import React from "react";
import "./SearchPage.scss";
import { useLocation } from "react-router-dom";
import SearchIcon from "../../icons/search-icon";
import axios from "axios";
import { API_URL } from "../../env";
import PropertyCard from "../../components/cards/property-card/PropertyCard";
import { SpinnerDiamond } from "spinners-react";
import NoResults from "../../helpers/NoResults";
const SearchPage = () => {
  const location: any | object = useLocation();
  const [search, setSearch] = React.useState<any>(location.state);
  const [results, setResults] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // search api

  React.useEffect(() => {
    searchSubmit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const searchSubmit = () => {
    axios
      .get(`${API_URL}/searchProperty`, { params: { search } })
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="search-page-container">
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
          <button className="hero-search-button" onClick={searchSubmit}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="search-results-container">
        {loading ? (
          <div className="loading-container">
            <SpinnerDiamond className="mt-16" size={100} />
          </div>
        ) : results.length === 0 ? (
          <NoResults />
        ) : (
          results.map((result: any) => {
            return <PropertyCard key={result.id} property={result} />;
          })
        )}
      </div>
    </div>
  );
};

export default SearchPage;
