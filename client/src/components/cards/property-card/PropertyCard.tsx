import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.scss";
import { API_URL } from "../../../env";

const PropertyCard = (props: any) => {
  const { property } = props;
  return (
    <div className="w-full   p-4 ">
      <Link
        to={`/property/${property._id}`}
        className="c-card  bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="relative p-24	 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={`${API_URL}/property/image/${property._id}`}
            alt=""
          />
        </div>

        <div className="p-4">
          <span className="inline-block px-2 py-1 my-2 text-primary-dark rounded-full font-semibold uppercase tracking-wide text-xs">
            {property.type === "vendre" ? "à vendre " : "à louer"}
          </span>
          <h2 className="mt-2 mb-2  font-bold text-black">{property.title}</h2>

          <span
            className={
              property.availability === "disponible"
                ? "inline-block px-2 py-1 leading-none bg-primary-light text-primary-dark rounded-full font-semibold uppercase tracking-wide text-xs"
                : "inline-block px-2 py-1 leading-none bg-red-light text-red-dark rounded-full font-semibold uppercase tracking-wide text-xs"
            }
          >
            {property.availability}
          </span>
          <h3 className="mt-2 mb-2  font-bold text-primary-dark">
            {property.city.toUpperCase()}
          </h3>
          <p className="text-sm">
            {property.description.length > 200
              ? property.description.substring(0, 199) + "..."
              : property.description}
          </p>
          <div className="mt-3 flex items-center">
            <span className="text-sm font-semibold">PRIX</span>&nbsp;
            <span className="font-bold text-xl">{property.price}/D</span>&nbsp;
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
