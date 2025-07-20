import React, { createContext, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "info" });
    }, 3000);
  };

  const hideToast = () => {
    setToast({ visible: false, message: "", type: "info" });
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
