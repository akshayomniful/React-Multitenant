import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const Unauthorized = () => {
  return (
    <div className="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-red-500 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>

      <div className="flex justify-center space-x-4">
        <Link to="/dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
        <Link to="/login">
          <Button>Switch User</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
