import React from "react";
import { motion } from "framer-motion";

const Step2 = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    updateFormData({ tags });
  };

  // Animation variants for staggered children
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

  // Animation for radio buttons
  const radioVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
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
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          placeholder="Enter tags separated by commas"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
          Visibility
        </label>
        <div className="space-y-2">
          <motion.div
            className="flex items-center"
            variants={radioVariants}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              id="private"
              name="visibility"
              value="private"
              checked={formData.visibility === "private"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 transition-colors duration-200"
            />
            <label
              htmlFor="private"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              Private
            </label>
          </motion.div>
          <motion.div
            className="flex items-center"
            variants={radioVariants}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              id="public"
              name="visibility"
              value="public"
              checked={formData.visibility === "public"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 transition-colors duration-200"
            />
            <label
              htmlFor="public"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              Public
            </label>
          </motion.div>
          <motion.div
            className="flex items-center"
            variants={radioVariants}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="radio"
              id="restricted"
              name="visibility"
              value="restricted"
              checked={formData.visibility === "restricted"}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 transition-colors duration-200"
            />
            <label
              htmlFor="restricted"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200"
            >
              Restricted (Tenant Only)
            </label>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label
          htmlFor="publishDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
        >
          Publish Date
        </label>
        <input
          type="date"
          id="publishDate"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        />
      </motion.div>
    </motion.div>
  );
};

export default Step2;
