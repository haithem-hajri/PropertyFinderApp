import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../env";
import "./PropertyMapModal.scss";
const PropertyMapModal = (props: any) => {
  const { property } = props;

  return (
    <div className=" modal-container  ">
      <img
        className=" h-full object-cover modal-map-header"
        src={`${API_URL}/property/image/${property._id}`}
        alt=""
      />
      <div className="modal-information">
        <Link to={`/property/${property._id}`}>
          <h1 className="text-primary text-xl mt-2 font-bold">
            {property.title}
          </h1>
        </Link>
        <p className="font-bold">
          {property.type === "vendre" ? "à vendre" : "à louer"}
        </p>
        <p className="font-bold">
          {property.type === "a louer"
            ? `${property.price}D/mois`
            : `${property.price} Dinars`}
        </p>
        <p
          className={
            property.availability === "disponible"
              ? "text-primary-dark text-center bg-primary-light p-2 m-auto w-1/3 rounded-xl"
              : "text-red-dark bg-red-light p-2 w-1/3 m-auto rounded-xl text-center"
          }
        >
          {property.availability}
        </p>
      </div>
    </div>
  );
};

export default PropertyMapModal;
