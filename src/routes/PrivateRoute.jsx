import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAbility } from "../hooks/useAbility";

const PrivateRoute = ({ children, requiredAbility }) => {
  const { currentUser, loading } = useAuth();
  const ability = useAbility();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredAbility) {
    const { action, subject } = requiredAbility;
    if (!ability.can(action, subject)) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateRoute;
