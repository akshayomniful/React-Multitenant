import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
}) => {
  const baseClasses =
    "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg",
  };

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ].join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
