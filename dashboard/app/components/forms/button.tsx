"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "social";
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  disabled,
  loading = false,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(
        // 🔹 Force horizontal layout & center content
        "inline-flex flex-row items-center justify-center gap-2",
        "rounded-lg text-sm font-medium transition relative overflow-hidden",
        "focus:ring-2 focus:ring-offset-2 transform",
        {
          "bg-primary text-white hover:bg-primary/90 shadow-sm focus:ring-primary hover:scale-105":
            variant === "primary" && !isDisabled,
          "border border-gray-300 dark:border-gray-600 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-700":
            variant === "secondary" || variant === "social",
          "opacity-70 cursor-not-allowed": isDisabled,
        },
        className
      )}
    >
      {/* Spinner */}
      {loading && (
        <span className="animate-spin">
          <svg
            className="w-5 h-5 text-white dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </span>
      )}

      {/* Label + Icon */}
      <span className="flex flex-row items-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
