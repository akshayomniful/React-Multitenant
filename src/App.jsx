import React from "react";
import { RouterProvider } from "react-router-dom";
import { AbilityProvider } from "./context/AbilityContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import router from "./routes/routes";

const App = () => {
  return (
    <AbilityProvider>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </AbilityProvider>
  );
};

export default App;
