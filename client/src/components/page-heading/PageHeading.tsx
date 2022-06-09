import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PageHeading = (props: any) => {
  const navigate = useNavigate();
  const { linkTo, title, LinkTitle } = props;

  return (
    <div
      className="my-0   container px-10 mx-auto flex flex-col 
 md:flex-row items-start md:items-center justify-between py-4 border-b border-primary-light bg-primary"
    >
      <div>
        <h4 className="text-2xl font-bold leading-tight text-white">{title}</h4>
      </div>
      <div className="mt-6 md:mt-0">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="mr-3 bg-white text-primary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray transition duration-150 ease-in-out rounded hover:bg-gray text-indigo-700   px-5 py-2 text-sm"
        >
          Back
        </button>
        <button className="transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 duration-150 ease-in-out hover:bg-gray bg-white rounded text-primary px-8 py-2 text-sm">
          <Link to={linkTo}>{LinkTitle}</Link>
        </button>
      </div>
    </div>
  );
};

export default PageHeading;
