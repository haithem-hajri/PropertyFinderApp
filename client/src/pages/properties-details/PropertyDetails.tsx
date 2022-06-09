import React, { useContext } from "react";
import "./PropertyDetails.scss";
import PageHeading from "../../components/page-heading/PageHeading";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../../env";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { AiFillDelete } from "react-icons/ai";
const PropertyDetails = () => {
  // import state
  const { state } = useContext(UserContext);
  const [data, setData] = React.useState<any>();
  //get id from url
  const { id } = useParams();
  const navigate = useNavigate();
  // get property by id
  React.useEffect(() => {
    axios.get(`${API_URL}/getPropertyById/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);
  // delete property
  const deleteProperty = () => {
    axios
      .delete(`${API_URL}/deleteProperty/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-primarybg pt-0 sm:pt-12">
      <PageHeading
        linkTo={"/"}
        title={"Annonce Title"}
        LinkTitle={"Toutes les annonces"}
      />
      <section className="sm:p-4  ">
        <div className="container">
          <div className="lg:w-5/6 mx-auto flex flex-wrap items-center">
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6  lg:mt-0 flex flex-col items-start">
              <div className="flex items-center">
                <h2 className="text-sm   tracking-widest text-primary">
                  ANNONCE
                </h2>
                {data &&
                  state &&
                  state.user &&
                  data.propertyUser === state.user.id && (
                    <button
                      onClick={deleteProperty}
                      className={
                        "text-red-dark bg-red-light p-2  ml-2 border-0  focus:outline-none  hover:bg-opacity-70 rounded"
                      }
                    >
                      <AiFillDelete color="white" />
                    </button>
                  )}
              </div>

              <h1 className="text-blue text-3xl  font-medium mb-1 text-primary-dark mr-2">
                {data && data.title}
              </h1>

              <div className="flex mb-4 ">
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>

                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>

                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </span>
              </div>
              <p className="leading-relaxed w-5/6">
                {data && data.description}
              </p>
              <div className="flex flex-row mt-4">
                <span className="flex   font-medium text-lg text-primary ">
                  Created At
                </span>
                <span className="flex   text-lg text-black ml-6">
                  {data && moment(data.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="flex flex-row mt-4">
                <span className="flex   font-medium text-lg text-primary ">
                  Nombre des chambres
                </span>
                <span className="flex   text-lg text-black ml-6 ">+3</span>
              </div>
              <div className="flex flex-row mt-4">
                <span className="flex   font-medium text-lg text-primary ">
                  {data && data.city}
                </span>
              </div>
              <div className="flex mt-4 flex-row items-center">
                <span className="flex   font-medium text-lg text-primary">
                  Category
                </span>
                <span className="flex text-lg items-center  text-black  ml-4">
                  {data && data.category}
                </span>
              </div>
              <div className="flex mt-4 mb-8 items-center">
                <button
                  className={
                    data && data.availability === "disponible"
                      ? "text-white bg-primary-light mr-8 border-0 py-2 px-6 focus:outline-none  hover:bg-opacity-70 rounded"
                      : "text-red-dark bg-red-light  mr-8 border-0 py-2 px-6 focus:outline-none  hover:bg-opacity-70 rounded"
                  }
                >
                  {data && data.availability}
                </button>

                <span className="flex   font-medium text-2xl text-blue">
                  ${data && data.price}
                </span>
              </div>
            </div>
            <div className="lg:w-1/2     rounded">
              <img
                src={`${API_URL}/property/image/${id}`}
                alt="annonce "
                className="object-cover object-center w-full"
                // width={100}
                // height={100}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
