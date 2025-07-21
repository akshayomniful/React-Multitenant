import React, { useState } from "react";
import { useAbility } from "../../hooks/useAbility";
import { useToast } from "../../hooks/useToast";
import Card from "../common/Card";
import Button from "../common/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { motion, AnimatePresence } from "framer-motion";

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

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
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
                <motion.div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step === currentStep
                      ? "bg-blue-500 dark:bg-blue-600 text-white"
                      : step < currentStep
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  } transition-colors duration-200`}
                  whileHover={step <= currentStep ? { scale: 1.1 } : {}}
                  animate={step === currentStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step}
                </motion.div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep
                        ? "bg-blue-500 dark:bg-blue-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    } transition-colors duration-200`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default MultiStepForm;
