import React from "react";
import { useAuth } from "../hooks/useAuth";
import RoleViewer from "../components/permissions/RoleViewer";
import MultiStepForm from "../components/forms/MultiStepForm";
import Card from "../components/common/Card";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
          Welcome, {currentUser.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <RoleViewer />
          <MultiStepForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card title="Tenant Information" className="mb-6">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Tenant Name
                </h4>
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {currentUser.tenant?.name}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Domain
                </h4>
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {currentUser.tenant?.domain}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Plan
                </h4>
                <p className="text-gray-900 dark:text-white capitalize transition-colors duration-200">
                  {currentUser.tenant?.plan}
                </p>
              </div>
            </div>
          </Card>

          <Card title="User Information">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200">
                    {currentUser.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Role
                </h4>
                <p className="text-gray-900 dark:text-white capitalize transition-colors duration-200">
                  {currentUser.role}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
