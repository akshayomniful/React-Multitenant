import React from "react";

const Card = ({
  children,
  title,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footer,
  footerClassName = "",
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200 ${className}`}
    >
      {title && (
        <div
          className={`px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-colors duration-200 ${headerClassName}`}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div
        className={`px-6 py-4 text-gray-700 dark:text-gray-200 transition-colors duration-200 ${bodyClassName}`}
      >
        {children}
      </div>
      {footer && (
        <div
          className={`px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 transition-colors duration-200 ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
