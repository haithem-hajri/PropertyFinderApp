import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../env";
import { SpinnerCircularSplit } from "spinners-react";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    //  formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<any>([]);
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  /****Function Submit****/

  const onSubmit = (data: object) => {
    setLoading(true);
    axios
      .post(API_URL + "/auth/signup", data)
      .then((res) => {
        navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
        setValidationErrors(err.response.data.error);
        setLoading(false);
      });
  };
  return (
    <div className="bg-primarybg p-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 m-auto bg-white py-8 mt-4">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-primary">
            Créer un compte
          </h1>
          <p className="text-sm dark:text-coolGray-400">
            Sign in to access your account
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
                Nom
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                placeholder="Nom*"
                className="w-full px-3 py-2  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {validationErrors &&
                validationErrors.map((message: any, i: any) =>
                  message.param && message.param === "name" ? (
                    <div key={i}>
                      <p className="text-red text-xs italic mt-1">
                        {message.msg}
                      </p>
                    </div>
                  ) : null
                )}
              {errors && errors.name && (
                <div>
                  {" "}
                  <p className="text-red text-xs italic mt-1">
                    {errors.name}
                  </p>{" "}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-primary"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email")}
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
              {errors && errors.user_exist && (
                <div>
                  {" "}
                  <p className="text-red text-xs italic mt-1">
                    {errors.user_exist}
                  </p>{" "}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm text-primary"
              >
                Numéro de téléphone
              </label>
              <input
                type="number"
                {...register("mobile")}
                placeholder="numéro de téléphone *"
                className="w-full px-3 py-2  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {validationErrors &&
                validationErrors.map((message: any, i: any) =>
                  message.param && message.param === "mobile" ? (
                    <div key={i}>
                      <p className="text-red text-xs italic mt-1">
                        {message.msg}
                      </p>
                    </div>
                  ) : null
                )}
              {errors && errors.user_exist && (
                <div>
                  {" "}
                  <p className="text-red text-xs italic mt-1">
                    {errors.user_exist}
                  </p>{" "}
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-between mb-2 ">
                <label htmlFor="password" className="text-sm text-primary">
                  Mot de passe
                </label>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="*****"
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
            <div>
              <div className="flex justify-between mb-2 ">
                <label htmlFor="password" className="text-sm text-primary">
                  Confirmer votre mot de passe
                </label>
              </div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="*****"
                className="w-full px-3 py-2  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200 "
              />
              {validationErrors &&
                validationErrors.map((message: any, i: any) =>
                  message.param && message.param === "confirmPassword" ? (
                    <div key={i}>
                      <p className="text-red text-xs italic mt-1">
                        {message.msg}
                      </p>
                    </div>
                  ) : null
                )}
              {errors && errors.confirmPassword && (
                <div>
                  {" "}
                  <p className="text-red text-xs italic mt-1">
                    {errors.confirmPassword}
                  </p>{" "}
                </div>
              )}
            </div> 
          </div>
          <div className="space-y-2">
            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center w-full px-8 py-3 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:shadow-outline text-white font-bold"
              >
                {loading && ( 
                  <SpinnerCircularSplit
                    color="white"
                    size={"25px"}
                    className="mx-2"
                  />
                )}{" "}
                Créer
              </button>
            </div>
            <p className="px-6 text-sm text-center ">
              Vous avez déjà un compte ?{" "}
              <Link
                rel="noopener noreferrer"
                to="/login"
                className="hover:underline "
              >
                Se connecter
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
