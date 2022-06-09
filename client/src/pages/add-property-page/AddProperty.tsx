import React, { useState } from "react";
import "./AddProperty.scss";
import StepsForm from "../../helpers/StepsForm";
import MapStepOne from "../../components/add-property-steps/map-step-one";
import InformationStepTwo from "../../components/add-property-steps/information-step-two";
import ImagesDescStepThree from "../../components/add-property-steps/images-descp-step-three";
const AddProperty = () => {
  const [step, setStep] = useState(1);
  //useState property
  const [property, setProperty] = useState();

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5  mx-auto flex flex-wrap ">
        <div className="flex flex-wrap w-full mt-8 ">
          <div className="flex items-center justify-center  w-1/4 responsive ">
            <StepsForm step={step} setStep={setStep} />
          </div>
          <div className="sm:w-3/4 w-full m-auto  rounded-lg  mt-12 mb-8  ">
            {step === 1 ? (
              <MapStepOne
                step={step}
                setStep={setStep}
                setProperty={setProperty}
                property={property}
              />
            ) : step === 2 ? (
              <InformationStepTwo
                step={step}
                setStep={setStep}
                setProperty={setProperty}
                property={property}
              />
            ) : (
              <ImagesDescStepThree
                step={step}
                setStep={setStep}
                setProperty={setProperty}
                property={property}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProperty;
