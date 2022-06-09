import React from "react";

const StepsForm = (props: any) => {
  const { step } = props;
  return (
    <div className="">
      <div className="flex relative pb-12 ">
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          {step === 1 ? (
            <div className="h-full w-1 bg-gray pointer-events-none"></div>
          ) : step > 1 ? (
            <div className="h-full w-1 bg-primary-light pointer-events-none"></div>
          ) : (
            <div className="h-full w-1 bg-gray pointer-events-none"></div>
          )}
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-light inline-flex items-center justify-center text-white relative z-10">
          1
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-primary mb-1 tracking-wider">
            STEP 1
          </h2>
          {step === 1 ? (
            <p className="leading-relaxed">IN PROGRESS</p>
          ) : step > 1 ? (
            <p className="leading-relaxed">COMPLETED</p>
          ) : (
            <p className="leading-relaxed">NOT STARTED</p>
          )}
        </div>
      </div>
      <div className="flex relative pb-12">
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          {step === 2 ? (
            <div className="h-full w-1 bg-gray pointer-events-none"></div>
          ) : step > 2 ? (
            <div className="h-full w-1 bg-primary-light pointer-events-none"></div>
          ) : (
            step < 2 && (
              <div className="h-full w-1 bg-gray pointer-events-none"></div>
            )
          )}
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-light inline-flex items-center justify-center text-white relative z-10">
          2
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-primary mb-1 tracking-wider">
            STEP 2
          </h2>
          <div className="leading-relaxed">
            {step === 2 ? (
              <p className="leading-relaxed">IN PROGRESS</p>
            ) : step > 2 ? (
              <p className="leading-relaxed">COMPLETED</p>
            ) : (
              step < 2 && <p className="leading-relaxed">NOT STARTED</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex relative pb-12">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-light inline-flex items-center justify-center text-white relative z-10">
          3
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-primary mb-1 tracking-wider">
            FINISH
          </h2>
          {step === 3 ? (
            <p className="leading-relaxed">IN PROGRESS</p>
          ) : step > 3 ? (
            <p className="leading-relaxed">COMPLETED</p>
          ) : (
            step < 3 && <p className="leading-relaxed">NOT STARTED</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepsForm;
