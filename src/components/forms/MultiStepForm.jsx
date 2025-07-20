import React, { useState } from "react";
import { useAbility } from "../../hooks/useAbility";
import { useToast } from "../../hooks/useToast";
import Card from "../common/Card";
import Button from "../common/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    visibility: "private",
    publishDate: "",
    additionalInfo: "",
  });

  const ability = useAbility();
  const { showToast } = useToast();

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;

    // Check permission for next step
    if (nextStep === 2 && !ability.can("access", "form-step-2")) {
      showToast("You don't have permission to access step 2", "error");
      return;
    }

    if (nextStep === 3 && !ability.can("access", "form-step-3")) {
      showToast("You don't have permission to access step 3", "error");
      return;
    }

    setCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    showToast("Form submitted successfully!", "success");
    setCurrentStep(1);
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: [],
      visibility: "private",
      publishDate: "",
      additionalInfo: "",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <Card
      title={`Multi-step Form (Step ${currentStep} of 3)`}
      footer={
        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          <div className="ml-auto">
            {currentStep < 3 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === currentStep
                    ? "bg-blue-500 text-white"
                    : step < currentStep
                    ? "bg-blue-100 text-blue-500"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? "bg-blue-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {renderStep()}
    </Card>
  );
};

export default MultiStepForm;
