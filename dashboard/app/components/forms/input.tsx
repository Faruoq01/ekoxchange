"use client";

import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  label?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  icon,
  label,
  id,
  className,
  error,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-light dark:text-text-dark"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark">
            {icon}
          </span>
        )}
        <input
          id={id}
          {...props}
          className={clsx(
            "w-full bg-background-light text-[13px] dark:bg-background-dark border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-3 rounded-lg text-heading-light dark:text-heading-dark focus:outline-none focus:ring-0 transition",
            error && "border-red-500",
            className
          )}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
