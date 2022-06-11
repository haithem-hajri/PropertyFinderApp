import React from "react";
import axios from "axios";
import { API_URL } from "../../../env";
import PropertyCard from "../../cards/property-card/PropertyCard";
import Paginate from "../../../helpers/pagination/Paginate";
import { SpinnerDiamond } from "spinners-react";
const PropertiesCard = (props: any) => {
  const { categories, type, city } = props;
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  //get getAllProperties from api axios
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `/api/getPropertyPagination?page=${currentPage}&category=${categories}&city=${city}&type=${type}`
      );
      setData(res.data.docs);
      setTotalPages(res.data.totalPages);
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage, categories, type, city]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <SpinnerDiamond className="mt-16" size={100} />
        </div>
      ) : (
        data.map((property: any) => (
          <PropertyCard
            key={property._id}
            property={property}
            isLoading={isLoading}
          />
        ))
      )}
      {!isLoading && totalPages && totalPages > 1 && (
        <Paginate
          totalPages={totalPages && totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PropertiesCard;
