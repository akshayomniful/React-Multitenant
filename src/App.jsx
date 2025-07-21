import React from "react";
import { RouterProvider } from "react-router-dom";
import { AbilityProvider } from "./context/AbilityContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import router from "./routes/routes";

const App = () => {
  return (
    <ThemeProvider>
      <AbilityProvider>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </AuthProvider>
      </AbilityProvider>
    </ThemeProvider>
  );
};

export default App;
