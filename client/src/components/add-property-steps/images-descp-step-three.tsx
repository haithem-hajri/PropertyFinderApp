import React from "react";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../env";
import { SpinnerCircularSplit } from "spinners-react";
const ImagesDescStepThree = (props: any) => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState<any>();
  const [imageError, setImageError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const maxNumber = 1;
  const { step, setStep, property } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitForm = (data: any) => {
    if (!images) {
      setImageError(true);
    } else {
      setImageError(false);
      setLoading(true);
      //create form data
      const formData = new FormData();
      formData.append("image", images[0].file);
      formData.append("title", property && property.title);
      formData.append("price", property.price);
      formData.append("city", property.city);
      formData.append("availability", property.availability);
      formData.append("type", property.type);
      formData.append("category", property.category);
      formData.append("lat", property.lat);
      formData.append("lng", property.lng);
      formData.append("description", data.description);
      formData.append("nbrSalle", data.nbrSalle);
      formData.append("nbrChambre", data.nbrChambre);

      axios
        .post(`${API_URL}/createProperty`, formData, {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  const onChangeImage = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <div>
      <div className="w-2/3 m-auto">
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
            onImageUpdate,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                className="bg-primary text-white px-4 my-4 py-2 rounded-md hover:bg-primary-dark"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                modifier votre image
              </button>

              {images ? (
                imageList.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image["data_url"]}
                      alt=""
                      className="w-80 h-80 "
                    />
                    <div className=" ">
                      <button
                        className="bg-primary mr-6 text-white px-4 my-4 py-2 rounded-md hover:bg-primary-dark"
                        onClick={() => onImageUpdate(index)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                  alt=""
                  className="w-80 h-80 "
                />
              )}
            </div>
          )}
        </ImageUploading>
        <p>
          {imageError && (
            <span className="text-red text-xs italic">
              Veuillez ajouter une image
            </span>
          )}
        </p>
      </div>

      <form
        className=" bg-white  mt-4 height"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className=" flex items-center   flex-wrap  my-4 mb-8 w-2/3 m-auto  ">
          <div className="mr-4 ">
            <label htmlFor="email" className="block mb-2 text-sm text-primary">
              nombre des chambres (Facultatif)
            </label>
            <input
              {...register("nbrChambre")}
              type="number"
              name="nbrChambre"
              placeholder="nmbr des chambres"
              className="w-76	 px-5 py-2  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div className="">
            <label htmlFor="mobile" className="block mb-2 text-sm text-primary">
              nombre des salles de bains (Facultatif)
            </label>
            <input
              type="number"
              {...register("nbrSalle")}
              placeholder="nmbr des salles de bains"
              className=" px-5 py-2 w-76	  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <div className="   my-4 mb-8 w-2/3 m-auto ">
          <div className="">
            <label htmlFor="email" className="block mb-2 text-sm text-primary">
              Description
            </label>

            <textarea
              {...register("description", { required: true })}
              name="description"
              className=" px-5 py-2 w-full  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="We build fine acmes."
              rows={6}
            ></textarea>
            <p>
              {errors.description && (
                <span className="text-red text-xs italic">
                  vous devez ajouter une description
                </span>
              )}
            </p>
          </div>
        </div>

        <div className=" w-full items-center justify-center flex p-4">
          <button
            className="bg-primary-light hover:bg-primary-dark text-white rounded px-6 cursor-pointer p-2 m-2"
            onClick={() => {
              step > 1 && setStep(step - 1);
            }}
          >
            Back
          </button>
          <button
            className="flex justify-center bg-primary-light hover:bg-primary-dark text-white rounded p-2 px-6 cursor-pointer m-2"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <SpinnerCircularSplit
                color="white"
                size={"25px"}
                className="mx-2"
              />
            )}{" "}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImagesDescStepThree;
