"use client";
import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  label?: string;
};

const Input: React.FC<InputProps> = ({
  icon,
  label,
  id,
  className,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-light dark:text-text-dark mb-2"
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
            "w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 pl-10 pr-4 py-3 rounded-lg text-heading-light dark:text-heading-dark focus:ring-2 focus:ring-primary focus:border-primary transition",
            className
          )}
        />
      </div>
    </div>
  );
};

export default Input;
