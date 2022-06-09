import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../env";
import { SpinnerCircularSplit } from "spinners-react";
const Login = () => {
  const {
    register,
    handleSubmit,
    //  formState: { errors },
  } = useForm();
  const { dispatch } = useContext(UserContext);
  const [validationErrors, setValidationErrors] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();
  const navigate = useNavigate();
  const onSubmit = (data: object) => {
    setLoading(true);
    axios
      .post(API_URL + "/login", data)
      .then((res) => {
        setLoading(false);
        dispatch({
          type: "LOGGED_IN",
          payload: { user: res.data.payload, isLoggedIn: res.data.loggedIn },
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", res.data.loggedIn);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response.data);
        setValidationErrors(err.response.data.error);
        //extracting the errors from validation errors
      });
  };

  return (
    <div className="bg-primarybg p-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 m-auto bg-white py-8 mt-4">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-primary">Se connecter</h1>
          <p className="text-sm dark:text-coolGray-400">
            Connectez-vous à votre compte
          </p>
        </div>
        <form
          className="space-y-12 ng-untouched ng-pristine ng-valid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-primary"
              >
                Email address
              </label>
              <input
                {...register("email")}
                //type="email"
                placeholder="Email*"
                className="w-full px-3 py-2  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {validationErrors &&
                validationErrors.map((message: any, i: any) =>
                  message.param && message.param === "email" ? (
                    <div key={i}>
                      <p className="text-red text-xs italic mt-1">
                        {message.msg}
                      </p>
                    </div>
                  ) : null
                )}
              {errors && errors.email && (
                <div>
                  {" "}
                  <p className="text-red text-xs italic mt-1">
                    {errors.email}
                  </p>{" "}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between md:mb-2 ">
                <label htmlFor="password" className="text-sm text-primary">
                  Mot de passe
                </label>
                <Link
                  rel="noopener noreferrer"
                  to="#"
                  className="text-xs hover:underline "
                >
                  nouveau mot de passe?
                </Link>
              </div>
              <input
                type="password"
                {...register("password", {
                  //  required: "you must specify your last name ",
                  //  maxLength: 100,
                })}
                placeholder=" Mot de passe*"
                className="w-full px-3 py-2  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200 "
              />
              {validationErrors &&
                validationErrors.map((message: any, i: any) =>
                  message.param && message.param === "password" ? (
                    <div key={i}>
                      <p className="text-red text-xs italic mt-1">
                        {message.msg}
                      </p>
                    </div>
                  ) : null
                )}
              {errors && errors.password && (
                <div>
                  {" "}
                  <p className="text-red text-xs italic mt-1">
                    {errors.password}
                  </p>{" "}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center w-full px-8 py-3 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:shadow-outline text-white font-bold"
              >
                {loading && (
                  <SpinnerCircularSplit
                    color="white"
                    size={"25px"}
                    className="mx-2"
                  />
                )}{" "}
                Se connecter
              </button>
            </div>
            <p className="px-6 text-sm text-center ">
              <Link
                rel="noopener noreferrer"
                to="/sign-up"
                className="hover:underline "
              >
                Créez un compte utilisateur?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
