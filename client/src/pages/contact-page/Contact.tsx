import React from "react";
import ContactUsLogo from "../../icons/images/ContactUs.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../env";
import { SpinnerCircularSplit } from "spinners-react";
const Contact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    //  formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  // onSubmit function axios post request
  const onSubmit = (data: object) => {
    setLoading(true);
    axios
      .post(API_URL + "/contactUs", data)
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="flex flex-col align-center justify-start">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl text-primary">
            Let's talk!
          </h2>
          <div className="text-primary-light">
            Vivamus in nisl metus? Phasellus.
          </div>
        </div>
        <img
          src={ContactUsLogo}
          alt="contactez-nous"
          className="w-60 self-center mt-12"
        />
      </div>
      <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="text-sm text-primary-light">
            Full name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder=""
            className="w-full p-3 rounded border border-solid border-primary-light"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-primary-light">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-3 rounded border border-solid border-primary-light"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm text-primary-light">
            Message
          </label>
          <textarea
            {...register("message")}
            className="w-full p-3 rounded border border-solid border-primary-light"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center w-full p-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark tracking-wide uppercase rounded border border-solid border-primary-light"
        >
          {loading && (
            <SpinnerCircularSplit
              color="white"
              size={"25px"}
              className="mx-2"
            />
          )}
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
