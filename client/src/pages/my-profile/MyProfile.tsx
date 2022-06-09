import React, { useState, useContext } from "react";
import PageHeading from "../../components/page-heading/PageHeading";
//import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../../App";
import { API_URL } from "../../env";
//import ImageUploading from "react-images-uploading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { SpinnerCircularSplit } from "spinners-react";
const MyProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  //const [images, setImages] = React.useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    //  formState: { errors },
  } = useForm();
  //const maxNumber = 1;
  const [validationErrors, setValidationErrors] = useState<any>([]);
  const [errors, setErrors] = useState<any>();
  const updateUser = (data: any) => {
    //update user api
    setLoading(true);
    axios
      .put(API_URL + "/updateUser", data, {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })

      .then((res) => {
        setLoading(false);
        dispatch({
          type: "UPDATE_USER",
          payload: { user: res.data.payload },
        });
        toast.success("🦄 Wow so easy!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

      .catch((err) => {
        setLoading(false);
        setErrors(err.response.data);
        setValidationErrors(err.response.data.error);
        //extracting the errors from validation errors
      });
  };

  /* const onChangeImage = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
    setLoadingImage(true);
    //upload image to server
    const formData = new FormData();
    formData.append("avatar", imageList[0].file);
    axios
      .put(API_URL + "/updateAvatar", formData, {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoadingImage(false);
        toast.success("🦄 Wow so easy!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoadingImage(false);
      });
  };*/
  return (
    <div className="bg-primarybg pt-0 sm:pt-12 ">
      <PageHeading
        title={"Mon Profil"}
        linkTo={"/mes-annonces"}
        LinkTitle={"Mes Annonces"}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "40px" }}
      />
      <div className=" p-8">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 m-auto bg-white py-8 mt-4">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold text-primary">
              Modifier mon profil
            </h1>
          </div>
          {/*<div className="flex justify-center items-center">
            <ImageUploading
              multiple={false}
              value={images}
              onChange={onChangeImage}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                //   onImageUpdate,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button
                    className="flex justify-center bg-primary text-white pl-4 pr-4 my-4 py-2 rounded-md hover:bg-primary-dark"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  > {loadingImage && (
                    <SpinnerCircularSplit
                      color="white"
                      size={"25px"}
                      className="mx-2"
                    />
                  )}
                    modifier votre image
                  </button>

                  {images ? (
                    imageList.map((image, index) => (
                      <div
                        key={index}
                        className="flex justify-center flex-col items-center"
                      >
                        <img
                          src={image["data_url"]}
                          alt=""
                          className="object-cover"
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center">
                      <img
                        src={
                          state && state.user && state.user.id
                            ? `${API_URL}/user/image/${
                                state &&
                                state.user &&
                                state.user.id &&
                                state.user.id
                              }`
                            : "https://www.w3schools.com/w3images/avatar2.png"
                        }
                        alt=""
                        className=""
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>*/}
          <form
            className="space-y-12 ng-untouched ng-pristine ng-valid"
            onSubmit={handleSubmit(updateUser)}
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
                  placeholder={state && state.user && state.user.name}
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
                  // value={state && state.user && state.user.email}
                  {...register("email")}
                  placeholder={state && state.user && state.user.email}
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
                  placeholder={state && state.user && state.user.mobile}
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
                  Enregister les modifications
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
