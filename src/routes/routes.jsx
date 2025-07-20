import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Articles from "../pages/Articles";
import Settings from "../pages/Settings";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute
            requiredAbility={{ action: "read", subject: "Dashboard" }}
          >
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/articles",
        element: (
          <PrivateRoute
            requiredAbility={{ action: "read", subject: "Article" }}
          >
            <Articles />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute
            requiredAbility={{ action: "manage", subject: "Settings" }}
          >
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
