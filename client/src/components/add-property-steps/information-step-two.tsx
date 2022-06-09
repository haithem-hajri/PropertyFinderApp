import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  CategoryOptions,
  TypeOptions,
  CityOptions,
  AvailabilityOptions,
} from "../../helpers/DataAddPropertyForm";

interface IAddProductForm {
  category: string;
  title: string;
  price: number;
  city: string;
  availability: string;
  type: string;
}

const InformationStepTwo = (props: any) => {
  const { step, setStep, setProperty } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAddProductForm>();

  const onSubmit = (data: any) => {
    if (data.category) {
      setProperty((prevState: any) => ({
        ...prevState,
        category: data.category,
        title: data.title,
        price: data.price,
        city: data.city,
        availability: data.availability,
        type: data.type,
      }));
      setStep(step + 1);
    }
  };

  return (
    <form className=" bg-white  mt-4 height" onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex items-center justify-center flex-wrap p-2 ">
        <div className="mx-6 flex-col relative mb-8 ">
          <label htmlFor="email" className="block text-sm text-primary">
            Titre
          </label>

          <input
            {...register("title", { required: true, maxLength: 80 })}
            type="text"
            name="title"
            placeholder="titre"
            className="w-80	 px-5 py-2     rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <p>
            {errors.title && (
              <span className="text-red text-xs italic absolute top-16 mt-1 ">
                vous devez ajouter le titre
              </span>
            )}
          </p>
        </div>
        <div className="relative mb-8">
          <label className="block text-sm text-primary">Prix D</label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="prix Dinar"
            className=" px-5 py-2 w-80	  rounded-md  border border-gray focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <p>
            {errors.price && (
              <span className="text-red text-xs italic absolute top-16 mt-1">
                vous devez ajouter le prix
              </span>
            )}
          </p>
        </div>
      </div>
      <div className=" flex items-center justify-center flex-wrap  my-4 ">
        <div className="mx-6 flex-col relative mb-8 ">
          <label className="block  text-sm text-primary">Categories</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                className=" w-80 py-2  "
                styles={colourStyles}
                options={CategoryOptions}
                onChange={(value: any) => {
                  onChange(value.value);
                }}
              />
            )}
          />
          <p>
            {errors.category && (
              <span className="text-red text-xs italic absolute top-18">
                vous devez ajouter la catégorie
              </span>
            )}
          </p>
        </div>
        <div className=" relative mb-8">
          <div className="flex justify-between  ">
            <label className=" text-sm text-primary">Ville</label>
          </div>
          <Controller
            name="city"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                className=" w-80 py-2  "
                styles={colourStyles}
                options={CityOptions}
                onChange={(value: any) => {
                  onChange(value.value);
                }}
              />
            )}
          />
          <p>
            {errors.city && (
              <span className="text-red text-xs italic absolute top-18">
                vous devez ajouter la ville
              </span>
            )}
          </p>
        </div>
      </div>
      <div className=" flex items-center justify-center flex-wrap  my-4  ">
        <div className="mx-6 relative mb-8">
          <div className="flex justify-between  ">
            <label className="text-sm text-primary">Disponibilité</label>
          </div>
          <Controller
            name="availability"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                options={AvailabilityOptions}
                className=" w-80 py-2  "
                styles={colourStyles}
                onChange={(value: any) => {
                  onChange(value.value);
                }}
              />
            )}
          />
          <p>
            {errors.availability && (
              <span className="text-red text-xs italic absolute top-18">
                vous devez ajouter la Disponibilité
              </span>
            )}
          </p>
        </div>
        <div className="relative mb-8">
          <div className="flex justify-between  ">
            <label className="text-sm text-primary">Type</label>
          </div>
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                className=" w-80 py-2  "
                styles={colourStyles}
                options={TypeOptions}
                onChange={(value: any) => {
                  onChange(value.value);
                }}
              />
            )}
          />
          <p>
            {errors.type && (
              <span className="text-red text-xs italic absolute top-18">
                vous devez choisir le type
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
          type="submit"
          className="bg-primary-light hover:bg-primary-dark text-white rounded p-2 px-6 cursor-pointer m-2"
          onClick={onSubmit}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default InformationStepTwo;

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "white",
    paddingTop: "2px",
    margin: "0",
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      //backgroundColor: isDisabled ? 'red' : 'blue',
      // color: '#FFF',
      // cursor: isDisabled ? 'not-allowed' : 'default',
      // padding: '10px',
    };
  },
};
