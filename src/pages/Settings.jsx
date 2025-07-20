import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { roles } from "../data/roles";
import { permissions } from "../data/permissions";

const Settings = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("tenant");

  const handleSaveSettings = () => {
    showToast("Settings saved successfully", "success");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your tenant and application settings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("tenant")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "tenant"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Tenant Settings
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "roles"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Roles & Permissions
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "users"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              User Management
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "tenant" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Tenant Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="tenantName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tenant Name
                    </label>
                    <input
                      type="text"
                      id="tenantName"
                      defaultValue={currentUser.tenant?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="domain"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Domain
                    </label>
                    <input
                      type="text"
                      id="domain"
                      defaultValue={currentUser.tenant?.domain}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="plan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subscription Plan
                    </label>
                    <select
                      id="plan"
                      defaultValue={currentUser.tenant?.plan}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="free">Free</option>
                      <option value="standard">Standard</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Roles & Permissions
                </h3>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <Card key={role.id} className="mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-md font-medium text-gray-900 capitalize">
                            {role.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {role.description}
                          </p>
                        </div>
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
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">
                          Permissions:
                        </h5>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <ul className="space-y-1">
                            {permissions[role.name]?.map(
                              (permission, index) => (
                                <li
                                  key={index}
                                  className="text-sm flex items-start"
                                >
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                    {permission.action}
                                  </span>
                                  <span className="text-gray-700">
                                    {permission.subject}
                                  </span>
                                  {permission.conditions && (
                                    <span className="text-gray-500 text-xs ml-2">
                                      (with conditions)
                                    </span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  User Management
                </h3>
                <p className="text-gray-600 mb-4">
                  Manage users within your tenant. You can add, edit, or remove
                  users and assign roles.
                </p>
                <Button
                  onClick={() =>
                    showToast("Add user functionality would go here", "info")
                  }
                >
                  Add User
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
                User management interface would be implemented here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
