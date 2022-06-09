import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/cards/property-card/PropertyCard";
import PageHeading from "../../components/page-heading/PageHeading";
import axios from "axios";
import NoResults from "../../helpers/NoResults";
import { API_URL } from "../../env";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/myProperties`, {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setProperties(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-0 sm:pt-12 bg-primarybg">
      <PageHeading
        linkTo={"/mon-profil"}
        title={"Mes Annonces"}
        LinkTitle={"Mon Profil"}
      />

      <div className="flex flex-col w-full m-auto sm:w-2/3">
        {properties && properties.length > 0 ? (
          properties.map((property: any) => (
            <PropertyCard
              key={property._id}
              property={property}
              isLoading={isLoading}
            />
          ))
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
};

export default MyProperties;
