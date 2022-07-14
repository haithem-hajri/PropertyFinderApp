import React, { useState } from "react";
import "./Properties.scss";
import PropertiesFiltre from "../filtre-properties-form/PropertiesFiltre";
import PropertiesMap from "./PropertiesMap/PropertiesMap";
import PropertiesCard from "./PropertiesByCards/PropertiesCard";
import { BsFilterSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "../../helpers/Modal/Modal"; 
const Properties = () => {
  const [searchMethod, setSearchMethod] = useState("cards");
  const [categories, setCategories] = React.useState<any | Array<string>>([]);
  const [type, setType] = React.useState<any | Array<string>>([]);
  const [city, setCity] = React.useState<any | Array<string>>([]);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="properties-container">
        <div className="properties-filtre">
          <PropertiesFiltre
            categories={categories}
            setCategories={setCategories}
            type={type}
            setType={setType}
            city={city}
            setCity={setCity}
          />
        </div>
        <div className="properties-filtre-modal">
          <BsFilterSquare
            className="text-primary-light text-4xl text-right"
            onClick={() => setIsOpen(!modalIsOpen)}
          />
        </div>
        <div className="properties-list">
          <div className="properties-list-header">
            <button
              className={
                searchMethod === "cards"
                  ? "active-search-methode "
                  : "not-active-search-methode "
              }
              onClick={() => setSearchMethod("cards")}
            >
              Recherche par cartes
            </button>
            <button
              className={
                searchMethod === "map"
                  ? "active-search-methode "
                  : "not-active-search-methode "
              }
              onClick={() => setSearchMethod("map")}
            >
              {" "}
              Recherche sur map{" "}
            </button>
          </div>
          <div>
            {searchMethod === "cards" ? (
              <PropertiesCard categories={categories} type={type} city={city} />
            ) : (
              searchMethod === "map" && (
                <PropertiesMap
                  categories={categories}
                  type={type}
                  city={city}
                />
              )
            )}
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <Modal open={modalIsOpen}>
          <div className="modal-header">
            <h2 className="modal-title">Filtrer les annonces</h2>
            <AiFillCloseCircle
              className="text-3xl close-modal"
              onClick={closeModal}
            />
          </div>

          <PropertiesFiltre
            categories={categories}
            setCategories={setCategories}
            type={type}
            setType={setType}
            city={city}
            setCity={setCity}
          />
        </Modal>
      )}
    </>
  );
};

export default Properties;
