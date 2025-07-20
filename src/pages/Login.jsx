import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { users } from "../data/users";
import Button from "../components/common/Button";

const Login = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUserId) {
      const success = login(parseInt(selectedUserId));
      if (success) {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">User Selector</h3>

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select a user
          </label>
          <select
            id="user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value=""> Select a user role</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role} at Tenant {user.tenantId})
              </option>
            ))}
          </select>
        </div>

        {selectedUserId && (
          <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Selected User Details
            </h4>
            {(() => {
              const user = users.find((u) => u.id === parseInt(selectedUserId));
              return (
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Role:</span> {user.role}
                  </p>
                  <p>
                    <span className="font-medium">Tenant ID:</span>{" "}
                    {user.tenantId}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        <Button type="submit" fullWidth disabled={!selectedUserId}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
