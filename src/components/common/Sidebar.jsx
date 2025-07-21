import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Can } from "../../context/AbilityContext";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobile,
  isOpen,
  setIsOpen,
}) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      ability: { action: "read", subject: "Dashboard" },
    },
    {
      path: "/articles",
      name: "Articles",
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
      ability: { action: "read", subject: "Article" },
    },
    {
      path: "/settings",
      name: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      ability: { action: "manage", subject: "Settings" },
    },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 dark:bg-gray-900 text-white fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${
        isMobile
          ? isOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-64"
          : isCollapsed
          ? "w-20"
          : "w-64"
      }`}
    >
      <div className="p-4 pt-20 overflow-y-auto h-full">
        <div
          className={`mb-6 ${isCollapsed && !isMobile ? "text-center" : ""}`}
        >
          <div
            className={`${
              isCollapsed && !isMobile
                ? "flex flex-col items-center"
                : "flex items-center space-x-3"
            } mb-3`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-10 w-10 rounded-full"
            />
            {(!isCollapsed || isMobile) && (
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-gray-400">{currentUser.role}</p>
              </div>
            )}
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="bg-gray-700 dark:bg-gray-800 rounded p-2 text-sm transition-colors duration-200">
              <p className="text-gray-300">
                Tenant: {currentUser.tenant?.name}
              </p>
            </div>
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <Can
                key={item.path}
                I={item.ability.action}
                a={item.ability.subject}
              >
                <li>
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      isCollapsed && !isMobile ? "justify-center" : "space-x-3"
                    } p-2 rounded-md transition-colors duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-600 dark:bg-blue-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    {(!isCollapsed || isMobile) && <span>{item.name}</span>}
                  </Link>
                </li>
              </Can>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
