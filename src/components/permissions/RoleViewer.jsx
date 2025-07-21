import React from "react";
import { useAbility } from "../../hooks/useAbility";
import { useAuth } from "../../hooks/useAuth";
import Card from "../common/Card";
import { motion } from "framer-motion";

const RoleViewer = () => {
  const ability = useAbility();
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  // Group permissions by subject
  const permissionsBySubject = {};

  ability.rules.forEach((rule) => {
    if (rule.subject) {
      const subject = Array.isArray(rule.subject)
        ? rule.subject.join(",")
        : String(rule.subject);

      if (!permissionsBySubject[subject]) {
        permissionsBySubject[subject] = [];
      }

      const action = Array.isArray(rule.actions)
        ? rule.actions.join(",")
        : rule.action || "unknown";

      permissionsBySubject[subject].push({
        action: action,
        conditions: rule.conditions ? JSON.stringify(rule.conditions) : null,
      });
    }
  });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title="Your Permissions" className="mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
              {currentUser.role}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200">
              {currentUser.tenant?.name}
            </div>
          </div>

          {Object.keys(permissionsBySubject).length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
              No permissions defined.
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(permissionsBySubject).map(
                ([subject, permissions], index) => (
                  <motion.div
                    key={subject}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-gray-900 transition-all duration-200"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                      {subject}
                    </h4>
                    <ul className="space-y-1">
                      {permissions.map((permission, index) => (
                        <li key={index} className="text-sm">
                          <span className="text-green-600 dark:text-green-400 font-medium transition-colors duration-200">
                            {permission.action}
                          </span>
                          {permission.conditions && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs ml-2 transition-colors duration-200">
                              (with conditions: {permission.conditions})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default RoleViewer;
