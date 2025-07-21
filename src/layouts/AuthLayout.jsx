import React from "react";
import { Outlet } from "react-router-dom";
import Toast from "../components/common/Toast";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* Header Section */}
      <div className="flex-shrink-0 pt-2 pb-2 px-4">
        <motion.h2
          className="text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          RBAC Multi-Tenant App
        </motion.h2>
      </div>

      {/* Main Content Area - Full Screen */}
      <motion.div
        className="flex-1 w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-full w-full bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
          <Outlet />
        </div>
      </motion.div>

      <Toast />
    </div>
  );
};

export default AuthLayout;
