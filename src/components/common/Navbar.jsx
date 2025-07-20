import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

const Navbar = ({
  toggleSidebar,
  isSidebarCollapsed,
  isMobile,
  isSidebarOpen,
}) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Toggle button for sidebar */}
            <button
              onClick={toggleSidebar}
              className="mr-2 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">
                {isMobile
                  ? isSidebarOpen
                    ? "Close sidebar"
                    : "Open sidebar"
                  : isSidebarCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobile ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isSidebarCollapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"}
                  />
                )}
              </svg>
            </button>

            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-500 font-bold text-xl">
                RBAC App
              </Link>
            </div>

            {currentUser && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/articles"
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Articles
                </Link>
                <Link
                  to="/settings"
                  className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="text-sm hidden sm:block">
                    <p className="text-gray-700 font-medium">
                      {currentUser.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {currentUser.role} @ {currentUser.tenant?.name}
                    </p>
                  </div>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
