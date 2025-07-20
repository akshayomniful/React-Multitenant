import React, { useEffect } from "react";
import { useToast } from "../../hooks/useToast";

const Toast = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  const typeClasses = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`${
          typeClasses[toast.type]
        } text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}
      >
        <span>{toast.message}</span>
        <button
          onClick={hideToast}
          className="ml-4 text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
