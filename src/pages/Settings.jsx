import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { roles } from "../data/roles";
import { permissions } from "../data/permissions";
import { motion, AnimatePresence } from "framer-motion";

const Settings = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("tenant");

  const handleSaveSettings = () => {
    showToast("Settings saved successfully", "success");
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0 },
  };

  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 },
    },
  };

  const staggerContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
          Manage your tenant and application settings
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-200">
        <div className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <nav className="flex -mb-px">
            <motion.button
              onClick={() => setActiveTab("tenant")}
              className={`py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === "tenant"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Tenant Settings
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("roles")}
              className={`py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === "roles"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Roles & Permissions
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === "users"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              User Management
            </motion.button>
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "tenant" && (
              <motion.div
                key="tenant"
                className="space-y-6"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                    Tenant Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <label
                        htmlFor="tenantName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
                      >
                        Tenant Name
                      </label>
                      <input
                        type="text"
                        id="tenantName"
                        defaultValue={currentUser.tenant?.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <label
                        htmlFor="domain"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
                      >
                        Domain
                      </label>
                      <input
                        type="text"
                        id="domain"
                        defaultValue={currentUser.tenant?.domain}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <label
                        htmlFor="plan"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200"
                      >
                        Subscription Plan
                      </label>
                      <select
                        id="plan"
                        defaultValue={currentUser.tenant?.plan}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      >
                        <option value="free">Free</option>
                        <option value="standard">Standard</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={handleSaveSettings}>Save Settings</Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "roles" && (
              <motion.div
                key="roles"
                className="space-y-6"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                    Roles & Permissions
                  </h3>
                  <motion.div
                    className="space-y-4"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {roles.map((role, index) => (
                      <motion.div
                        key={role.id}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-md font-medium text-gray-900 dark:text-white capitalize transition-colors duration-200">
                                {role.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                {role.description}
                              </p>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  showToast(
                                    "Edit role functionality would go here",
                                    "info"
                                  )
                                }
                              >
                                Edit Role
                              </Button>
                            </motion.div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                              Permissions:
                            </h5>
                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md transition-colors duration-200">
                              <ul className="space-y-1">
                                {permissions[role.name]?.map(
                                  (permission, index) => (
                                    <motion.li
                                      key={index}
                                      className="text-sm flex items-start"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 + index * 0.05 }}
                                    >
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-2 transition-colors duration-200">
                                        {permission.action}
                                      </span>
                                      <span className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                        {permission.subject}
                                      </span>
                                      {permission.conditions && (
                                        <span className="text-gray-500 dark:text-gray-400 text-xs ml-2 transition-colors duration-200">
                                          (with conditions)
                                        </span>
                                      )}
                                    </motion.li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                key="users"
                className="space-y-6"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-200">
                    User Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-200">
                    Manage users within your tenant. You can add, edit, or
                    remove users and assign roles.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() =>
                        showToast(
                          "Add user functionality would go here",
                          "info"
                        )
                      }
                    >
                      Add User
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-center text-gray-500 dark:text-gray-400 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  User management interface would be implemented here
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
