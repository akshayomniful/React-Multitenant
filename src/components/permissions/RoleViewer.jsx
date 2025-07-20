import React from "react";
import { useAbility } from "../../hooks/useAbility";
import { useAuth } from "../../hooks/useAuth";
import Card from "../common/Card";

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

  return (
    <Card title="Your Permissions" className="mb-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentUser.role}
          </div>
          <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentUser.tenant?.name}
          </div>
        </div>

        {Object.keys(permissionsBySubject).length === 0 ? (
          <p className="text-gray-500">No permissions defined.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(permissionsBySubject).map(
              ([subject, permissions]) => (
                <div key={subject} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{subject}</h4>
                  <ul className="space-y-1">
                    {permissions.map((permission, index) => (
                      <li key={index} className="text-sm">
                        <span className="text-green-600 font-medium">
                          {permission.action}
                        </span>
                        {permission.conditions && (
                          <span className="text-gray-500 text-xs ml-2">
                            (with conditions: {permission.conditions})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RoleViewer;
