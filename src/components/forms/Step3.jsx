import React from "react";
import { motion } from "framer-motion";

const Step3 = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const summaryVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
      },
    },
  };

  const summaryItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.3 + i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <label
          htmlFor="additionalInfo"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
        >
          Additional Information
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          placeholder="Enter any additional information here"
        ></textarea>
      </motion.div>

      <motion.div
        className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md transition-colors duration-200"
        variants={summaryVariants}
      >
        <h4 className="text-blue-800 dark:text-blue-200 font-medium mb-2 transition-colors duration-200">
          Form Summary
        </h4>
        <div className="space-y-2 text-sm">
          <motion.p custom={0} variants={summaryItemVariants}>
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Title:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {formData.title || "Not provided"}
            </span>
          </motion.p>
          <motion.p custom={1} variants={summaryItemVariants}>
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Description:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {formData.description || "Not provided"}
            </span>
          </motion.p>
          <motion.p custom={2} variants={summaryItemVariants}>
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Category:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {formData.category || "Not selected"}
            </span>
          </motion.p>
          <motion.p custom={3} variants={summaryItemVariants}>
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Tags:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {formData.tags.length > 0 ? formData.tags.join(", ") : "None"}
            </span>
          </motion.p>
          <motion.p custom={4} variants={summaryItemVariants}>
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Visibility:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {formData.visibility}
            </span>
          </motion.p>
          <motion.p custom={5} variants={summaryItemVariants}>
            <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Publish Date:
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200 transition-colors duration-200">
              {formData.publishDate || "Not set"}
            </span>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Step3;
