import React from "react";
import { useAuth } from "../hooks/useAuth";
import RoleViewer from "../components/permissions/RoleViewer";
import MultiStepForm from "../components/forms/MultiStepForm";
import Card from "../components/common/Card";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome, {currentUser.name}!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RoleViewer />
          <MultiStepForm />
        </div>

        <div>
          <Card title="Tenant Information" className="mb-6">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Tenant Name
                </h4>
                <p className="text-gray-900">{currentUser.tenant?.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Domain</h4>
                <p className="text-gray-900">{currentUser.tenant?.domain}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Plan</h4>
                <p className="text-gray-900 capitalize">
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
                  <p className="text-gray-900 font-medium">
                    {currentUser.name}
                  </p>
                  <p className="text-gray-500 text-sm">{currentUser.email}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Role</h4>
                <p className="text-gray-900 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
