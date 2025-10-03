"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "social";
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "w-full flex justify-center rounded-lg text-sm font-medium transition",
        {
          "bg-primary text-white hover:bg-primary/90 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105":
            variant === "primary",
          "border border-gray-300 dark:border-gray-600 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-gray-700":
            variant === "secondary" || variant === "social",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
